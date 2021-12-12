module.exports = {
  extends: [
    // '@magusn/magusn' is short for '@magusn/eslint-config-magusn'
    // see https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules
    '@magusn/magusn/react',
    'next/core-web-vitals',
  ],
  globals: {
    __DEV__: 'readonly',
  },
  rules: {
    // allow console because we strip it out in .babelrc.js anyway
    'no-console': [0],
  },
};
