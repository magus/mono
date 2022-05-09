#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { VidError } from './common/VidError.js';
import * as chalk from './common/chalk.js';

let cli_argv;

try {
  yargs(hideBin(process.argv))
    .check((argv) => {
      // capture cli argv for use in catch
      cli_argv = argv;

      // verify file exists before proceeding
      throw new VidError('Input does not exist.');

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
} catch (err) {
  // clean MonoError message without stack trace
  console.log('\n', chalk.error('UnhandledError', err.message));

  if (!cli_argv.verbose) {
    console.log('\n', ' Add `-v` to see stack trace for this failure.');
    process.exit(1);
  } else {
    console.log();
    throw err;
  }
}
