module.exports = {
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'error',
    'no-inner-declarations': 'off',
    'import/no-unresolved': 'error',
  },
};
