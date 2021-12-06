module.exports = {
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      extends: ['plugin:jest/recommended'],
      rules: {
        // 'jest/no-disabled-tests': 'error',
      },
    },
  ],
};
