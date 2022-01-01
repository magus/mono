#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as commands from './commands/index.js';
import { MonoError } from './common/MonoError.js';
import * as chalk from './common/chalk.js';
import { isMonoRepo } from './common/isMonoRepo.js';
import { ROOT } from './common/ROOT.js';

try {
  yargs(hideBin(process.argv))
    .command(commands.list)
    .command({
      ...commands.lookup.root,
      command: '$0',
      desc: `${commands.lookup.root.desc} (fallback command handler)`,
    })
    .check((argv) => {
      if (!isMonoRepo(argv)) {
        throw new MonoError(`Please run \`mono\` from within [${ROOT.dir}]`);
      }

      return true;
    })
    .help().argv;
} catch (err) {
  // clean MonoError message without stack trace
  if (err instanceof MonoError) {
    console.log('\n', err.message);
    process.exit(1);
  } else {
    console.log('\n', chalk.mono_error('UnhandledError', err.message), '\n');
    throw err;
  }
}
