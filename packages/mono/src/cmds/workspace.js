import { rest } from '../common/rest.js';
import { mono_exec } from '../common/exec.js';
import { getWorkspaces } from '../common/workspaces.js';

export const command = 'workspace <workspace>';
export const aliases = ['ws'];
export const desc = 'Run yarn command for workspace';

// mono ws magic dev
// mono ws magic build -- -v --cli-flag=true

// get all workspaces

export function builder(yargs) {
  const workspaces = getWorkspaces();
  const wsNames = workspaces.list.map((ws) => ws.pkg.name);
  const wsAliases = workspaces.list.map((ws) => ws.pkg.alias);

  return yargs.option('workspace', {
    describe: 'workspace for which to run command',
    choices: [...wsNames, ...wsAliases],
  });
}

export function handler(argv) {
  const cmd = rest(argv, true);
  const workspaces = getWorkspaces();
  const workspace = workspaces.map.get(argv.workspace);

  // console.debug('[workspace:handler]', { cmd, argv, workspace });
  mono_exec(cmd, workspace);
}
