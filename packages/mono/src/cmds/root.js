import { rest } from '../common/rest.js';
import { mono_exec, exec } from '../common/exec.js';
import { repoRoot } from '../common/workspaces.js';

export const command = 'root';
export const desc = 'Run yarn command from monorepo root';

export function builder(yargs) {
  return yargs.coerce('cmd', () => rest(yargs.argv));
}

export function handler(argv) {
  // console.debug('[root]', { argv });
  process.chdir(repoRoot());
  exec(mono_exec(`yarn ${argv.cmd}`));
}
