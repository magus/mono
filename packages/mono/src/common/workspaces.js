import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { MonoError } from '../common/MonoError.js';

const __dirname = new URL(import.meta.url).pathname;

export const ROOT = {};

try {
  ROOT.dir = path.resolve(__dirname, '../../../../../');
  ROOT.pkgPath = path.resolve(ROOT.dir, 'package.json');

  if (!fs.existsSync(ROOT.pkgPath)) {
    throw new MonoError('Could not find repo root package.json');
  }

  ROOT.pkg = JSON.parse(fs.readFileSync(ROOT.pkgPath));
} catch (err) {
  throw new MonoError(err);
}

export function getWorkspaces() {
  const cwd = ROOT.dir;

  const workspaceDirList = [];
  for (const wsPattern of ROOT.pkg.workspaces) {
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
