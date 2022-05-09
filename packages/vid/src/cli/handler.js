import path from 'path';

import * as CLI from '../common/CLI.js';

export async function handler(argv) {
  const metadata = {};

  metadata.fps = eval(ffprobe(argv.input_video_file.fullPath, ['r_frame_rate']).r_frame_rate);

  const dimensions = ffprobe(argv.input_video_file.fullPath, ['width', 'height']);

  metadata.size = {};

  metadata.size.width = int(dimensions.width);
  metadata.size.height = int(dimensions.height);
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

  const cmdParts = ['ffmpeg', '-i', argv.input_video_file.fullPath];

  // gather opt parts to append to output filename
  const optParts = [];

  for (const opt of ['speed']) {
    if (Object.prototype.hasOwnProperty.call(argv, opt)) {
      optParts.push(`${opt}-${argv[opt]}`);
    }
  }

  for (const opt of ['no-audio', 'no-video', 'preserve-frames']) {
    if (argv[opt]) {
      optParts.push(opt);
    }
  }

  const inputPath = path.dirname(argv.input_video_file.fullPath);
  const { filename, extension } = path.basename(argv.input_video_file.fullPath).match(RE.filename).groups;
  const outputPath = path.join(inputPath, [filename, Date.now(), optParts.join('--'), argv.ext].join('.'));

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

    const audioSpeedFilter = tempos.map((v) => `atempo=${v}`).join(',');
    audioFilters.push(audioSpeedFilter);
  }

  if (argv.size) {
    videoFilters.push(`scale=w=${argv.size}:h=${argv.size}:force_original_aspect_ratio=decrease:flags=lanczos`);
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
    cmdParts.push(`-filter_complex "${filtersComplex.join(';')}" -map "[v]" -map "[a]"`);
  }

  cmdParts.push(outputPath);

  const cmd = cmdParts.join(' ');

  console.log({
    argv,
    cmdParts,
    cmd,
    inputPath,
    filename,
    extension,
    optParts,
    outputPath,
    audioFilters,
    videoFilters,
    metadata,
  });

  console.log();
  console.log(' ', '🤖 📹 Executing `ffmpeg` command ...');
  console.log(' ', cmd);
  console.log();

  await CLI.exec(cmd);
}

function ffprobe(input, fields) {
  const cmd = [
    `ffprobe -v error -select_streams v:0 -show_entries stream=${fields.join(',')} -of csv=s=x:p=0`,
    input,
  ].join(' ');

  const probeData = CLI.execSync(cmd);

  // split result by the 'x' join character
  const probeDataList = probeData.split('x');
  const result = {};
  for (let i = 0; i < probeDataList.length; i++) {
    result[fields[i]] = probeDataList[i];
  }

  return result;
}

const RE = {
  filename: /(?<filename>.*?)\.(?<extension>[^.]+)$/,
};

const int = (n) => parseInt(n, 10);
