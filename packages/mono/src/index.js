#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { commands, commandLookup } from './cmds/index.js';

yargs(hideBin(process.argv))
  .command(commands)
  .command({
    ...commandLookup.root,
    command: '$0',
    desc: `${commandLookup.root.desc} (fallback command handler)`,
  })
  .help().argv;
