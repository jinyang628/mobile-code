module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native'],
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': ['warn', { skip: ['Button'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
