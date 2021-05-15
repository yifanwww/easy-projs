module.exports = {
    root: true,
    env: {
        browser: true,
        es2017: true,
        jest: true,
        node: true,
    },
    extends: ['airbnb-typescript/base', 'prettier', 'prettier/prettier'],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs', '*.d.ts'],
    parserOptions: {
        project: 'tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'import', 'jest', 'jsx-a11y', 'node', 'prettier', 'react', 'react-hooks'],
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
        // Disabled for leading-underscore options of '@typescript-eslint/naming-convention'
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

        // Disabled for better comments
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#the-indent--typescript-eslintindent-rules
        // Disables this rule and use prettier instead
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'accessor', format: ['camelCase'] },
            { selector: 'class', format: ['PascalCase'] },
            { selector: 'enum', format: ['PascalCase'] },
            { selector: 'enumMember', format: ['camelCase'] },
            {
                // 'PascalCase' for react function components
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            { selector: 'interface', format: ['PascalCase'] },
            { selector: 'method', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'property', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'typeAlias', format: ['PascalCase'] },
            { selector: 'typeParameter', format: ['PascalCase'] },
            {
                // 'PascalCase' for functional components/containers or containers generated by react-redux.connect
                // 'UPPER_CASE' for constant variables
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
        ],

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

        // Checks rules of Hooks
        'react-hooks/rules-of-hooks': 'error',
        // Checks effect dependencies
        'react-hooks/exhaustive-deps': 'warn',
    },
};
