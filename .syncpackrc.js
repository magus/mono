// https://github.com/JamieMason/syncpack

module.exports = {
  dev: true,
  filter: '.',
  indent: '  ',
  peer: true,
  prod: true,
  semverRange: '',
  sortAz: [
    'contributors',
    'dependencies',
    'devDependencies',
    'keywords',
    'peerDependencies',
    // disable sorting scripts because we have comments in root package.json scripts
    // 'scripts',
  ],
  sortFirst: [
    'name',
    'description',
    'version',
    'gitHead',
    'author',
    'private',
    'license',
    'main',
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
