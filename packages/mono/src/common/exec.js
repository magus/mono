import path from 'path';
import { execSync } from 'child_process';
import { chalk, bracket, mono } from './chalk.js';

export function mono_exec(cmd, workspace) {
  let wsContext = 'root';
  if (workspace) {
    wsContext = workspace.pkg.name;
  }

  const ws = bracket(chalk.cyan(wsContext));
  console.log(mono(`Running ${ws}${bracket(cmd)}`));

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
