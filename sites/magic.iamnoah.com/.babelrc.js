// Can eventually remove and replace once these plugins are supported
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
    // development plugins
    ['styled-components', { ssr: true, displayName: true }],
  ],

  env: {
    production: {
      plugins: [
        // production plugins
        ['styled-components', { ssr: true, displayName: false }],
        ['transform-remove-console'],
      ],
    },
  },
};
