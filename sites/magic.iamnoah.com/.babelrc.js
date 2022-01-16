// TODO
// We can eventually remove .babelrc entirely once all plugins are supported by swc
// See https://github.com/vercel/next.js/discussions/30174

// babel-preset.js
const preset = require('next/babel');

console.debug(preset.plugins);

const config = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: '>1% in US and not ie 11',
          modules: false,
        },
      },
    ],
  ],

  plugins: [
    // default plugins
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@pages': './src/pages',
        },
      },
    ],
  ],

  env: {
    production: {
      plugins: [
        // production plugins
        ['transform-remove-console'],
      ],
    },
  },
};

// mutates babel config for styles related stuff
const Styles = require('@magusn/react/styles/cjs');
Styles.babelrc(config);

module.exports = config;
