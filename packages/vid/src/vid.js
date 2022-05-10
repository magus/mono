#!/usr/bin/env node

import * as chalk from './common/chalk.js';
import { VidError } from './common/VidError.js';
import { parser } from './cli/parser.js';
import { handler } from './cli/handler.js';

async function main() {
  try {
    const argv = parser(locals);
    await handler(argv);
  } catch (err) {
    // clean message without stack trace
    if (err instanceof VidError) {
      console.log('\n', err.message);
    } else {
      console.log('\n', chalk.vid_error('UnhandledError', err.message));
    }

    if (!locals.cli_argv.verbose) {
      console.log('\n', 'Add `-v` to see stack trace for this failure.');
      process.exit(1);
    } else {
      console.log();
      throw err;
    }
  }
}

const locals = {};

// call main last after all declaractions
main();
