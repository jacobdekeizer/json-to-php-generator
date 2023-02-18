module.exports = {
  root: true,
  env: {
    es2021: true
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'vue/multi-word-component-names': 'off',
  }
};
