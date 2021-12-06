module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  rules: {
    'no-console': 1,
  },
};
