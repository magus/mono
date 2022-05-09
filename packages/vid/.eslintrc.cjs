module.exports = {
  extends: [
    // '@magusn/magusn' is short for '@magusn/eslint-config-magusn'
    // see https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules
    '@magusn/magusn',
  ],
  settings: {
    'import/ignore': ['ora'],
  },
  rules: {
    // allow console in internal scripting directory
    'no-console': [0],
  },
};
