import path from 'path';
import { ROOT } from './ROOT.js';
import { exec_result } from './exec.js';

function isFileSystemRoot(dir) {
  return path.dirname(dir) === dir;
}

export function isMonoRepo() {
  // confirm we are inside the mono repo with recursive walk up with '..'
  const walkPath = [exec_result('pwd')];
  const resolvedWalkPath = () => path.resolve(...walkPath);

  while (!isFileSystemRoot(resolvedWalkPath())) {
    // console.debug(ROOT.dir, resolvedWalkPath());

    if (resolvedWalkPath() === ROOT.dir) {
      return true;
    }

    walkPath.push('..');
  }

  return false;
}
