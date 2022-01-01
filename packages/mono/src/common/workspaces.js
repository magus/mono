import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { ROOT } from '../common/ROOT.js';

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
