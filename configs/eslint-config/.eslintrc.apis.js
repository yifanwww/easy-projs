const { apiNaming } = require('./naming');

module.exports = {
    extends: ['./.eslintrc.basic.js'],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],

    rules: {
        // https://typescript-eslint.io/rules/naming-convention
        '@typescript-eslint/naming-convention': apiNaming,
    },
};
