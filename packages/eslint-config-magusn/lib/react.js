module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    'react/prop-types': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    componentWrapperFunctions: [{ property: 'styled' }],
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
  },
};
