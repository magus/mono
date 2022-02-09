module.exports = {
  extends: [
    // '@magusn/magusn' is short for '@magusn/eslint-config-magusn'
    // see https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules
    '@magusn/magusn',
  ],
  ignorePatterns: [
    // force line breaks
    '!.prettierrc.js',
    '!.commitlintrc.js',
  ],
};
