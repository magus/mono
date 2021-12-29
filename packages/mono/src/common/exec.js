import path from 'path';
import { execSync } from 'child_process';
import * as chalk from './chalk.js';

export function mono_exec(cmd, workspace) {
  const match = cmd.match(/^yarn (.*)/);
  if (match) {
    const [, yarnCmd] = match;
    cmd = yarnCmd;
  }

  exec(mono_cmd(`yarn ${cmd}`, workspace), workspace);
}

export function mono_cmd(cmd, workspace) {
  let wsContext = 'root';
  if (workspace) {
    wsContext = workspace.pkg.name;
  }

  const ws = chalk.bracket(chalk.chalk.cyan(wsContext));
  console.log(chalk.mono(`Running ${ws}${chalk.bracket(cmd)}`));

  return cmd;
}

export function exec(cmd, workspace) {
  if (workspace) {
    process.chdir(path.resolve(workspace.path));
  }

  execSync(cmd, { stdio: 'inherit' });
}

export function exec_result(cmd) {
  const output = execSync(cmd).toString();
  const result = output.trim();
  return result;
}
