#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { hideBin } from 'yargs/helpers';
import { VidError } from './common/VidError.js';
import * as chalk from './common/chalk.js';

const RE = {
  filename: /(?<filename>.*?)\.(?<extension>[^\.]+)$/,
  dimensions: /(?<width>\d+)x(?<height>\d+)/,
};

const int = (n) => parseInt(n, 10);

let cli_argv;

try {
  const argv = yargs(hideBin(process.argv))
    .command('$0 [input_video_file]', 'cli helper for ffmpeg')
    .positional('input_video_file', {
      describe: 'path to video file to convert',
      type: 'string',
    })
    .coerce('input_video_file', (input) => {
      const result = { input };
      // arg exists relative to process cwd
      if (fs.existsSync(input)) {
        result.fullPath = input;
      } else {
        result.fullPath = path.join(process.cwd(), input);
      }

      return result;
    })
    .option('speed', {
      alias: 's',
      demandOption: false,
      describe: 'numeric factor to adjust playback speed of output\nexample: 0.5',
      type: 'number',
    })
    .option('ext', {
      choices: ['mp4'],
      demandOption: false,
      default: 'mp4',
      describe: 'extension of output video file',
      type: 'string',
    })
    .option('no-audio', {
      alias: ['an'],
      demandOption: false,
      describe: 'remove audio track from input source',
      type: 'boolean',
    })
    .option('preserve-frames', {
      alias: 'pf',
      demandOption: false,
      describe: 'attempt to preserve frames by increasing fps when speeding up video',
      type: 'boolean',
    })
    .option('no-video', {
      alias: 'vn',
      demandOption: false,
      describe: 'remove video track from input source',
      type: 'boolean',
    })
    .option('get', {
      demandOption: false,
      describe: 'output metadata related to the input source',
      choices: ['fps', 'dimensions', 'size'],
    })
    .coerce('get', (input) => {
      // guarantee always an array
      if (input && !Array.isArray(input)) {
        return [input];
      }

      return input;
    })
    .check((argv) => {
      // capture cli argv for use in catch
      cli_argv = argv;

      // verify file exists before proceeding

      if (!fs.existsSync(argv.input_video_file.fullPath)) {
        const file = chalk.bracket(chalk.chalk.dim.gray(argv.input_video_file.input));
        throw new VidError(`${file} does not exist.`);
      }

      const stat = fs.statSync(argv.input_video_file.fullPath);

      if (stat.isDirectory()) {
        const file = chalk.bracket(chalk.chalk.dim.gray(argv.input_video_file.input));
        throw new VidError(`${file} is a directory.`);
      }

      // verify single options are not passed twice (arrays)
      for (const opt of ['speed', 'ext']) {
        if (Array.isArray(argv[opt])) {
          const name = chalk.bracket(opt);
          const value = chalk.array(argv[opt]);
          throw new VidError(`Must define a single ${name} value, received ${value}`);
        }
      }

      if (argv['no-audio'] && argv['no-video']) {
        throw new VidError(
          `${chalk.bracket('--no-video')} with ${chalk.bracket('--no-audio')} is nothing, remove one.`,
        );
      }

      return true;
    })
    .option('v', {
      alias: 'verbose',
      demandOption: false,
      default: false,
      describe: 'Include more information in outputs',
      type: 'boolean',
    })
    .help().argv;

  const metadata = {};

  metadata.fps = eval(
    child_process
      .execSync(
        [
          'ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=s=x:p=0',
          argv.input_video_file.fullPath,
        ].join(' '),
      )
      .toString()
      .trim(),
  );

  const dimensions = child_process
    .execSync(
      [
        'ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0',
        argv.input_video_file.fullPath,
      ].join(' '),
    )
    .toString()
    .trim()
    .match(RE.dimensions).groups;

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

  const cmd = ['ffmpeg', '-i', argv.input_video_file.fullPath];

  // gather opt parts to append to output filename
  const optParts = [];

  for (const opt of ['speed']) {
    if (argv.hasOwnProperty(opt)) {
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
    cmd.push(`-r ${metadata.fps * argv.speed}`);
  }

  let audioFilters = [];
  let targetSpeed = argv.speed;
  while (isSlowDown ? targetSpeed < factor : targetSpeed > factor) {
    audioFilters.push(factor);
    targetSpeed /= factor;
  }
  audioFilters.push(targetSpeed);

  const audioFilter = audioFilters.map((v) => `atempo=${v}`).join(',');
  const videoFilter = `setpts=${Math.pow(argv.speed, -1)}*PTS`;

  let filter;

  if (argv['no-audio']) {
    filter = `-an -filter:v "${videoFilter}"`;
  } else if (argv['no-video']) {
    filter = `-vn -filter:a "${audioFilter}"`;
  } else {
    let filter = `-filter_complex "[0:v]${videoFilter}[v];[0:a]${audioFilter}[a]" -map "[v]" -map "[a]"`;
  }

  cmd.push(filter);

  cmd.push(outputPath);

  console.log({
    argv,
    cmd,
    inputPath,
    filename,
    extension,
    optParts,
    outputPath,
    audioFilters,
    audioFilter,
    videoFilter,
    metadata,
  });

  console.log(cmd.join(' '));
} catch (err) {
  // clean MonoError message without stack trace
  console.log('\n', chalk.vid_error('UnhandledError', err.message));

  if (!cli_argv.verbose) {
    console.log('\n', ' Add `-v` to see stack trace for this failure.');
    process.exit(1);
  } else {
    console.log();
    throw err;
  }
}
