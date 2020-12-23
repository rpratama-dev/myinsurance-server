module.exports = {
  env: {
    browser: true,
    commonjs: true,
    // es2021: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    // ecmaFe123
  },
  rules: {
    'no-console': 0,
    quotes: [1, 'single'],
    'linebreak-style': [1, 'unix'],
    semi: [1, 'always'],
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
