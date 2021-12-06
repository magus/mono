module.exports = {
  extends: [
    // '@magusn/magusn' is short for '@magusn/eslint-config-magusn'
    // see https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules
    '@magusn/magusn',
    'next/core-web-vitals',
  ],
  globals: {
    __DEV__: 'readonly',
  },
};
