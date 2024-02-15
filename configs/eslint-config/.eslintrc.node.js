const { apiNaming } = require('./naming');

module.exports = {
    env: {
        es2020: true,
        jest: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended-type-checked',
        // TODO: may extends stricter rule configurations in the future
        // 'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
        'prettier/prettier',
        'plugin:jest/recommended',
        'plugin:jest/style',
        './.eslintrc.basic.js',
    ],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],
    plugins: ['@typescript-eslint', 'import', 'jest', 'node', 'prettier'],

    rules: {},
    overrides: [
        {
            files: ['*.dto.ts'],
            rules: {
                // https://eslint.org/docs/latest/rules/max-classes-per-file
                'max-classes-per-file': 'off',

                // https://typescript-eslint.io/rules/naming-convention
                '@typescript-eslint/naming-convention': apiNaming,
            },
        },
    ],
};
