#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as commands from './commands/index.js';
import { MonoError } from './common/MonoError.js';
import * as chalk from './common/chalk.js';
import { isMonoRepo } from './common/isMonoRepo.js';
import { ROOT } from './common/ROOT.js';

let cli_argv;

try {
  yargs(hideBin(process.argv))
    .check((argv) => {
      // capture cli argv for use in catch
      cli_argv = argv;

      if (!isMonoRepo(argv)) {
        throw new MonoError(`Please run \`mono\` from within [${ROOT.dir}]`);
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
    .command(commands.list)
    .command({
      ...commands.lookup.root,
      command: '$0',
      desc: 'Fallback command handler (see `mono root`)',
    })
    .help().argv;
} catch (err) {
  // clean MonoError message without stack trace
  if (err instanceof MonoError) {
    console.log('\n', err.message);
  } else {
    console.log('\n', chalk.mono_error('UnhandledError', err.message));
  }

  if (!cli_argv.verbose) {
    console.log('\n', chalk.mono(' Add `-v` to see stack trace for this failure.'));
    process.exit(1);
  } else {
    console.log();
    throw err;
  }
}
