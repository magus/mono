module.exports = {
  extends: [
    'next/core-web-vitals',
    // TODO use @magusn/eslint-config-magusn
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    __DEV__: 'readonly',
  },
};
