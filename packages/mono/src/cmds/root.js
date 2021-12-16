import fs from 'fs';
import path from 'path';

import { MonoError } from '../common/MonoError.js';
import { mono_exec, exec, exec_result } from '../common/exec.js';

export const command = 'root';
export const desc = 'Run yarn command from monorepo root';

export function builder(yargs) {
  return yargs.coerce('cmd', (argv) => {
    const [, , ...argvList] = process.argv;
    // remove `command`, i.e. 'root' to ensure we are checking for rest of command
    // > mono root
    // ❌ Error: No command specified
    // > mono root changeset
    // ✅ Runs ...
    const filteredArgvList = argvList.filter((c) => c !== command);
    const restCmd = filteredArgvList.join(' ');
    if (restCmd) {
      return restCmd;
    }

    console.debug(process.argv);
    throw new MonoError(`No command specified, e.g. try \`mono${['', ...argvList].join(' ')} changeset\``);
  });
}

export function handler(argv) {
  // console.debug('[root]', { argv });

  const pwd = exec_result('pwd');
  const currentDir = [pwd];
  let foundRepoRoot = false;
  for (let i = 0; i < 10; i++) {
    const dir = path.resolve(...currentDir);

    // exit when we find repo root
    if (isRepoRoot(dir)) {
      foundRepoRoot = true;
      break;
    }

    // exit if we hit root of filesystem
    if (dir === '/') {
      break;
    }

    // go up a directory and retry
    currentDir.push('..');
  }

  if (!foundRepoRoot) {
    throw new MonoError('Unable to locate repo root');
  }

  process.chdir(path.resolve(...currentDir));
  exec(mono_exec(`yarn ${argv.cmd}`));
}

function isRepoRoot(dir) {
  // console.debug('isRepoRoot', { dir });
  const pkgPath = path.resolve(dir, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return false;
  }

  const pkgRawContent = fs.readFileSync(pkgPath).toString();

  try {
    const pkg = JSON.parse(pkgRawContent);
    // console.debug({ pkgPath, pkg });
    return pkg.name === 'mono-root';
  } catch (err) {
    throw new MonoError('Invalid package.json', { err, pkgPath, pkgRawContent });
  }

  return false;
}
