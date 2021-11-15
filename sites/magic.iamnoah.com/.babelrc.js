// TODO Can eventually remove and replace once these plugins are supported
// https://github.com/vercel/next.js/discussions/30174

module.exports = {
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
    ['styled-components', { ssr: true, displayName: true }],
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
