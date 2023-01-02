module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  // parser: "babel-eslint,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    Rellax: 'readonly',
    AOS: 'readonly',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
  },
};
