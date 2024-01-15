import path from 'path';
import fs from 'fs';
import Inquirer from 'inquirer';
import * as Ora from 'ora';
import Jimp from 'jimp';

import { parse_filename } from '../common/parse_filename.js';
import * as chalk from '../common/chalk.js';
import * as CLI from '../common/CLI.js';
import { VidError } from '../common/VidError.js';

import { download } from './download.js';

export async function handler(argv) {
  // gather metadata about input source video

  if (argv.verbose) {
    console.debug(argv);
  }

  if (argv.input_video_file.url) {
    return await download(argv);
  }

  const metadata = {};

  const video_probe = ffprobe(argv, 'video');
  const audio_probe = ffprobe(argv, 'audio');

  // returns fraction such as `25/1`
  // use `eval` to resolve into integer
  metadata.fps = eval(video_probe.r_frame_rate);

  metadata.video = {};
  metadata.video.bitrate = int(video_probe.bit_rate);
  metadata.video.duration = float(video_probe.duration);

  metadata.audio = {};
  metadata.audio.bitrate = int(audio_probe.bit_rate);

  metadata.bitrate = metadata.video.bitrate + metadata.audio.bitrate;

  metadata.size = {};

  metadata.size.width = int(video_probe.width);
  metadata.size.height = int(video_probe.height);
  metadata.dimensions = metadata.size;

  if (argv.get) {
    console.log();
    console.log('📹 Video metadata');
    console.log();
    for (const field of argv.get) {
      console.log('-', field, metadata[field]);
    }

    process.exit(0);
  }

  const file = parse_filename(path.basename(argv.input_video_file.fullPath));
  const inputPath = path.dirname(argv.input_video_file.fullPath);

  // gather opt parts to append to output filename

  const optParts = [];
  for (const opt of ['speed', 'dimension']) {
    if (Object.prototype.hasOwnProperty.call(argv, opt)) {
      optParts.push(`${opt}-${argv[opt]}`);
    }
  }
  for (const opt of ['no-audio', 'no-video', 'preserve-frames']) {
    if (argv[opt]) {
      optParts.push(opt);
    }
  }

  // build ffmpeg command based on argv

  const cmdParts = ['ffmpeg', '-i', quotify(argv.input_video_file.fullPath)];

  // audio can only be adjusted in factors of up to 2
  // so calculate the sequence of factors that equal the target speed

  const isSlowDown = argv.speed < 1;
  const factor = isSlowDown ? 0.5 : 2;

  if (argv['preserve-frames'] && !isSlowDown) {
    cmdParts.push(`-r ${metadata.fps * argv.speed}`);
  }

  const videoFilters = [];
  const audioFilters = [];

  if (argv.speed) {
    videoFilters.push(`setpts=${Math.pow(argv.speed, -1)}*PTS`);

    let tempos = [];
    let targetSpeed = argv.speed;
    while (isSlowDown ? targetSpeed < factor : targetSpeed > factor) {
      tempos.push(factor);
      targetSpeed /= factor;
    }
    tempos.push(targetSpeed);

    if (metadata.audio) {
      const audioSpeedFilter = tempos.map((v) => `atempo=${v}`).join(',');
      audioFilters.push(audioSpeedFilter);
    }
  }

  // output image to crop / resize
  if (argv.crop) {
    const rect = await handleUserCrop({ argv, metadata, inputPath });

    if (argv.verbose) {
      console.debug('crop', { rect });
    }

    videoFilters.push(`crop=${rect.width}:${rect.height}:${rect.x}:${rect.y}`);
    optParts.push(['crop', rect.x, rect.y, rect.width, rect.height].join('-'));
  }

  if (argv.dimension) {
    videoFilters.push(
      `scale=w=${argv.dimension}:h=${argv.dimension}:force_original_aspect_ratio=decrease:flags=lanczos`,
    );

    videoFilters.push('scale=trunc(iw/2)*2:trunc(ih/2)*2');
  }

  if (argv['no-audio']) {
    cmdParts.push('-an');
  } else if (argv['no-video']) {
    cmdParts.push('-vn');
  }

  const filtersComplex = [];

  if (videoFilters.length) {
    filtersComplex.push(`[0:v]${videoFilters.join(',')}[v]`);
  }
  if (audioFilters.length) {
    filtersComplex.push(`[0:a]${audioFilters.join(',')}[a]`);
  }

  if (filtersComplex.length) {
    const filterComplex = [`-filter_complex "${filtersComplex.join(';')}"`];

    if (videoFilters.length) {
      filterComplex.push('-map "[v]"');
    }

    if (audioFilters.length) {
      filterComplex.push('-map "[a]"');
    }

    cmdParts.push(filterComplex.join(' '));
  }

  const outputFilename = [file.name, Date.now(), optParts.join('--'), argv.ext].filter(Boolean).join('.');
  const outputPath = quotify(path.join(inputPath, outputFilename));

  cmdParts.push(outputPath);

  const cmd = cmdParts.join(' ');

  if (argv.verbose) {
    console.debug({
      argv,
      cmdParts,
      cmd,
      inputPath,
      file,
      optParts,
      outputPath,
      audioFilters,
      videoFilters,
      metadata,
    });
  }

  const ffmpeg_exec = CLI.exec(cmd);

  Ora.oraPromise(ffmpeg_exec.promise, {
    prefixText: ' 📹',
    text: ' Executing `ffmpeg` command ... ',
    successText: () =>
      `Successfully converted ${chalk.bracket(argv.input_video_file.input)} to ${chalk.bracket(outputFilename)}.`,
    failText: () => `Failed to convert ${chalk.bracket(argv.input_video_file.input)}.`,
  });

  try {
    await ffmpeg_exec.promise;
  } catch (err) {
    throw new VidError(['ffmpeg', ffmpeg_exec.stderr].join(':'));
  }

  CLI.execSync(`open ${inputPath}`);
}

const quotify = (content) => `"${content}"`;

function ffprobe(argv, stream) {
  const input = argv.input_video_file.fullPath;

  const cmd = [
    // build for stream
    'ffprobe -v error -show_streams -select_streams',
    stream === 'video' ? 'v:0' : 'a',
    quotify(input),
  ].join(' ');

  const probe_data = CLI.execSync(cmd);
  const probe_entry_list = probe_data.split('\n');

  const result = {};

  for (const entry of probe_entry_list) {
    const [key, value] = entry.split('=');
    result[key] = value;
  }

  if (argv.verbose) {
    console.debug('ffprobe', stream, { cmd, probe_data, result });
  }

  return result;
}

const int = (n) => parseInt(n, 10);
const float = (n) => parseFloat(n);

async function confirmGate(message) {
  const name = 'proceed';
  const promptAnswer = await Inquirer.prompt({
    type: 'confirm',
    name,
    message,
  });
  if (!promptAnswer[name]) {
    throw new VidError('Successfully cancelled.');
  }
}

async function handleUserCrop({ argv, metadata, inputPath }) {
  console.log('In order to crop we will open a still frame from the video for you to edit');
  console.log('Delete the area you want to select for your crop region');

  await confirmGate('Okay, got it.');

  const cropImageFilename = ['magusn-vid-crop', Date.now(), 'png'].join('.');
  const cropImageOutputPath = path.join(inputPath, cropImageFilename);

  // get crop seconds, default to halfway point of video
  const unsafeCropSeconds = argv['crop-frame-seconds'] || metadata.video.duration / 2;

  // ensure crop seconds are within video duration
  const cropSeconds = clamp(unsafeCropSeconds, 0, metadata.video.duration);

  // write out tmp cropping image
  const stillCropFrame = [
    'ffmpeg -hide_banner -loglevel error',
    `-ss ${cropSeconds} -i ${quotify(argv.input_video_file.fullPath)} -frames:v 1`,
    quotify(cropImageOutputPath),
  ].join(' ');

  // console.debug({ stillCropFrame, cropSeconds, unsafeCropSeconds, metadata });

  CLI.execSync(stillCropFrame);
  CLI.execSync(`open ${cropImageOutputPath}`);

  await confirmGate('Are you done?');

  const cropImage = await Jimp.read(cropImageOutputPath);
  const cropBounds = { x: null, y: null, width: null, height: null };
  const pixel = (x, y) => Jimp.intToRGBA(cropImage.getPixelColour(x, y));

  // scan left-to-right top-to-bottom
  for (let y = 0; y < cropImage.bitmap.height; y++) {
    if (cropBounds.x !== null) {
      break;
    }

    for (let x = 0; x < cropImage.bitmap.width; x++) {
      if (cropBounds.x !== null) {
        break;
      }

      if (cropBounds.x === null && pixel(x, y).a === 0) {
        // start of transparency (top-left corner)
        cropBounds.x = x;
        cropBounds.y = y;
      }
    }
  }

  // scan from x to right edge of crop
  for (let x = cropBounds.x; x < cropImage.bitmap.width; x++) {
    if (pixel(x, cropBounds.y).a !== 0) {
      // end transparency width
      cropBounds.width = x - cropBounds.x;
      break;
    }
  }
  // scan from y down to bottom edge of crop
  for (let y = cropBounds.y; y < cropImage.bitmap.height; y++) {
    if (pixel(cropBounds.x, y).a !== 0) {
      // end transparency height
      cropBounds.height = y - cropBounds.y;
      break;
    }
  }
  // crop went to right edge of image
  if (!cropBounds.width) {
    cropBounds.width = cropImage.bitmap.width - cropBounds.x;
  }
  // crop went to bottom edge of image
  if (!cropBounds.height) {
    cropBounds.height = cropImage.bitmap.height - cropBounds.y;
  }

  // cleanup tmp cropping image
  fs.rmSync(cropImageOutputPath);

  return cropBounds;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
