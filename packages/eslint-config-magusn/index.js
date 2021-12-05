module.exports = {
  parser: 'babel-eslint',
  extends: [
    // force line break
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
};
