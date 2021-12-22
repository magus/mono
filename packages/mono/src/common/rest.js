import { MonoError } from './MonoError.js';

// get the 'rest' of the command
// argv from yargs has `_` which are positionals
export function rest(argv, omitFirst) {
  // console.debug('rest', { argv });

  let restCmd;
  if (omitFirst) {
    // omit first element, the command, e.g. 'ws'
    //  > rest('mono ws magic blahblah 42 hi')
    //  'blahblah 42 hi'
    //  > rest('mono root changeset')
    //  'changeset'
    const [, ...restArgs] = argv._;
    restCmd = restArgs;
  } else {
    // return all rest of positionals
    // e.g.
    //  > rest('mono changeset')
    //  'changeset'
    restCmd = argv._;
  }

  // check to ensure we have content
  // e.g.
  // > mono root
  // ❌ Error: No command specified
  // > mono root changeset
  // ✅ Runs ...
  if (restCmd.length === 0) {
    throw new MonoError(`No command specified.`);
  }

  return restCmd.join(' ');
}
