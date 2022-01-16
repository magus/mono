// this babel config is required for `mono ws react test:unit` to run
module.exports = {
  presets: [
    // jest will fail to parse `import` without this
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // jest will fail to parse jsx without this
    [
      '@babel/preset-react',
      {
        pragma: 'dom', // default pragma is React.createElement (only in classic runtime)
        pragmaFrag: 'DomFrag', // default is React.Fragment (only in classic runtime)
        throwIfNamespace: false, // defaults to true
        runtime: 'classic', // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
      },
    ],
  ],
};
