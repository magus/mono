// https://github.com/JamieMason/syncpack

module.exports = {
  dev: true,
  filter: '.',
  indent: '  ',
  peer: true,
  prod: true,
  semverRange: '',
  sortAz: [
    // sort contents of these fields
    'contributors',
    'dependencies',
    'devDependencies',
    'keywords',
    'peerDependencies',
    'scripts',
  ],
  sortFirst: [
    'name',
    'alias',
    'description',
    'version',
    'gitHead',
    'author',
    'private',
    'license',
    'type',
    'main',
    'module',
    'bin',
    'sideEffects',
    'workspaces',
    'files',
    'publishConfig',
    'repository',
    'scripts',
    'peerDependencies',
    'dependencies',
    'devDependencies',
    'config',
  ],
  source: [
    'package.json',
    // include all workspaces package.json files
    ...require('./package.json').workspaces.map((workspaceDir) => `${workspaceDir}/package.json`),
  ],
  versionGroups: [],
};
