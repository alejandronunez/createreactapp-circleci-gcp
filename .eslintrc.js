const path = require('path');
// const graphqlSchema = require('./graphql.schema.json');

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'graphql', 'prettier'],
  rules: {
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     env: 'apollo',
    //     schemaJson: graphqlSchema,
    //   },
    // ],
    'prettier/prettier': 'error',
    'max-len': [2, { code: 80, ignorePattern: '^import\\W.*' }],
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
