import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { MonoError } from '../common/MonoError.js';
import { exec_result } from '../common/exec.js';

export function getWorkspaces() {
  const cwd = repoRoot();
  const rootPkg = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json')));

  const workspaceDirList = [];
  for (const wsPattern of rootPkg.workspaces) {
    workspaceDirList.push(...glob.sync(wsPattern, { cwd }));
  }

  const workspaceMap = new Map();
  const workspaceList = [];

  for (const workspaceDir of workspaceDirList) {
    const fullPath = path.resolve(cwd, workspaceDir);
    const pkg = JSON.parse(fs.readFileSync(path.resolve(fullPath, 'package.json')));
    const workspaceEntry = { path: fullPath, pkg };
    workspaceMap.set(pkg.name, workspaceEntry);
    workspaceMap.set(pkg.alias, workspaceEntry);
    workspaceList.push(workspaceEntry);
  }

  return {
    map: workspaceMap,
    list: workspaceList,
  };
}

export function repoRoot() {
  const pwd = exec_result('pwd');
  const currentDir = [pwd];

  let foundRepoRoot = false;

  while (!foundRepoRoot) {
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

  return path.resolve(...currentDir);
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
}
