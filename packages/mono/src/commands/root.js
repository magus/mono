import { rest } from '../common/rest.js';
import { mono_exec } from '../common/exec.js';
import { ROOT } from '../common/workspaces.js';

export const command = 'root';
export const desc = 'Run yarn command from monorepo root';

// mono changeset
// mono yarn changeset
// mono test:deps:fix

export function builder(yargs) {
  return yargs.coerce('cmd', () => rest(yargs.argv));
}

export function handler(argv) {
  // console.debug('[root]', { argv });
  process.chdir(ROOT.dir);
  mono_exec(argv.cmd);
}
