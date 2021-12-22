import path from 'path';
import { execSync } from 'child_process';
import { chalk, bracket, mono } from './chalk.js';

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

  const ws = bracket(chalk.cyan(wsContext));
  console.log(mono(`Running ${ws}${bracket(cmd)}`));

  return cmd;
}

export function exec(cmd, workspace) {
  if (workspace) {
    process.chdir(path.resolve(workspace.path));
  }

  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    const name = bracket(exec_result('whoami'));
    console.error(chalk.dim.red(mono(`Sorry ${name}, I cannot do that.`)));
  }
}

export function exec_result(cmd) {
  const output = execSync(cmd).toString();
  const result = output.trim();
  return result;
}
