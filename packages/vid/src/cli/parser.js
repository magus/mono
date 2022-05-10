import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { hideBin } from 'yargs/helpers';

import * as chalk from '../common/chalk.js';
import { VidError } from '../common/VidError.js';

export function parser(locals) {
  return yargs(hideBin(process.argv))
    .command('$0 <input_video_file>', 'cli helper for ffmpeg')
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
    .option('dimension', {
      alias: ['d', 'scale', 'size'],
      demandOption: false,
      describe: 'scale largest dimension to this value  (maintain aspect ratio)',
      type: 'number',
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
    .option('crop', {
      alias: 'c',
      demandOption: false,
      describe: 'use a still image to dynamically select crop region',
      type: 'boolean',
    })
    .option('crop-frame-seconds', {
      alias: 'cfs',
      demandOption: false,
      describe: 'seconds into video to use for capturing still frame used for dynamic crop',
      implies: 'crop',
      type: 'number',
    })
    .option('preserve-frames', {
      alias: 'pf',
      demandOption: false,
      describe: 'attempt to preserve frames by increasing fps when speeding up video',
      type: 'boolean',
    })
    .option('no-audio', {
      alias: ['an'],
      demandOption: false,
      describe: 'remove audio track from input source',
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
      locals.cli_argv = argv;

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
      for (const opt of ['speed', 'ext', 'size']) {
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
}
