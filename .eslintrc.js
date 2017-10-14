module.exports = {
  'extends': 'google',
  'env': {
    'browser': true,
  },
  'rules': {
    // --- BEGIN Disabled rules ---
    'no-var': 0,
    'padded-blocks': 0,
    'prefer-rest-params': 0,
    // --- BEGIN Errors ---
    'no-tabs': 2,
    'indent': ['error', 2],
    'no-multi-spaces': 2,
    // --- BEGIN Warnings ---
    'quotes': 1,
    'one-var': 1,
    'max-len': [1, 160],
    'require-jsdoc': 1,
    'valid-jsdoc': 1,
  },
};
