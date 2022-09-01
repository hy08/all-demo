module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'react-app'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
