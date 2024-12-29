module.exports = {
  root: true,
  env: {
    mocha: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // Ensuring consistent indentation with 2 spaces
    indent: ['error', 2],
    // Ensuring use of single quotes for strings
    quotes: ['error', 'single'],
    // Disallow unnecessary multi-spaces
    'no-multi-spaces': 'error',
    // Ensure no trailing spaces
    'no-trailing-spaces': 'error',
    // Allow console statements
    'no-console': 0,
    // Disallow the use of underscores in variable names (unless necessary)
    'no-underscore-dangle': 0,
    // Handle object curly newline for consistency
    'object-curly-newline': ['error', { consistent: true }],
    // Allow reassigning function parameters
    'no-param-reassign': 0,
    // Allow specific restricted syntax
    'no-restricted-syntax': 0,
    // Maximum line length
    'max-len': ['error', { code: 120, ignoreComments: true }],
    // Operator line breaks (make sure operators like '+' break to the next line)
    'operator-linebreak': ['error', 'after'],
    // Require trailing commas for multiline objects and arrays
    'comma-dangle': ['error', 'always-multiline'],
    // Prefer template literals over string concatenation
    'prefer-template': 'error',
    // Enforce parentheses around arrow function arguments
    'arrow-parens': ['error', 'as-needed'],
    // Enforce using arrow functions for callbacks
    'prefer-arrow-callback': 'error',
    // Disallow function expressions without names
    'func-names': ['warn', 'always'], // Warn for unnamed functions
    // Ensure no extra blank lines at the end of the file
    'no-multiple-empty-lines': ['error', { max: 1 }],
    // Remove newline at the end of the file if missing
    'eol-last': ['error', 'always'],
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ['app/models/index.js'],
      rules: {
        'global-require': 'off', // Disable the global-require rule for this file
        'import/no-dynamic-require': 'off', // Allow dynamic require
      },
    },
  ],
};
