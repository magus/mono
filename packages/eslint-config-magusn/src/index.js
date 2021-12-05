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
  rules: {
    // easily verify rules are hooked up by uncommenting this
    // will allow unused var errors by ignoring them
    // for example, the line below would NOT throw an error
    //    let unused = 0;
    //
    // 'no-unused-vars': 0,
  },
};

// example test config

//   overrides: [
//     {
//       files: ['**/*.test.js'],
//       env: {
//         jest: true, // now **/*.test.js files' env has both es6 *and* jest
//       },
//       // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
//       // "extends": ["plugin:jest/recommended"]
//       plugins: ['jest'],
//       rules: {
//         'jest/no-disabled-tests': 'warn',
//         'jest/no-focused-tests': 'error',
//         'jest/no-identical-title': 'error',
//         'jest/prefer-to-have-length': 'warn',
//         'jest/valid-expect': 'error',
//       },
//     },
//   ],
//   parserOptions: {
//     ecmaVersion: 2020,
//     ecmaFeatures: {
//       legacyDecorators: true,
//       jsx: true,
//     },
//   },
