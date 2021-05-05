module.exports = {
    root: true,
    env: {
        browser: true,
        es2017: true,
    },
    extends: ['airbnb-base', 'prettier', 'prettier/prettier'],
    plugins: ['import', 'prettier'],
    rules: {
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        // Disables this rule and use prettier instead
        'function-paren-newline': 'off',
        'guard-for-in': 'off',
        'implicit-arrow-linebreak': 'off',
        // https://github.com/prettier/eslint-config-prettier/#max-len
        // This rule is needed but disabled by eslint-config-prettier
        'max-len': ['error', { code: 120, ignoreUrls: true }],
        // Allows bitwise operators, but be CAREFUL for not using them in most case.
        'no-bitwise': 'off',
        'no-console': ['error', { allow: ['log', 'debug', 'info', 'warn', 'error'] }],
        'no-constant-condition': 'off',
        'no-continue': 'off',
        'no-else-return': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        // https://github.com/prettier/eslint-config-prettier/#no-tabs
        // This rule is needed but disabled by eslint-config-prettier
        'no-tabs': 'error',
        'no-underscore-dangle': 'off',
        // https://github.com/prettier/eslint-config-prettier/#no-unexpected-multiline
        // This rule is needed but disabled by eslint-config-prettier
        'no-unexpected-multiline': 'error',
        // Disables this rule and use prettier instead
        'object-curly-newline': 'off',
        // Disables this rule and use prettier instead
        'operator-linebreak': 'off',
        // https://github.com/prettier/eslint-config-prettier/#quotes
        // This rule is needed but disabled by eslint-config-prettier
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        // Seems not working for tsx extension
        'import/extensions': 'off',
        // 'import/extensions': [
        //     'error',
        //     'always',
        //     { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        // ],
        // Disabled for import-statement of 'electron'
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',

        // Enables prettier rules
        'prettier/prettier': 'error',
    },
};
