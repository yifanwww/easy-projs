module.exports = {
    root: true,
    env: {
        browser: true,
        es2017: true,
        jest: true,
        node: true,
    },
    extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier', 'prettier/prettier'],
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],
    plugins: [
        '@typescript-eslint',
        // 'deprecation',
        'import',
        'jest',
        'jsx-a11y',
        'node',
        'prettier',
        'react',
        'react-hooks',
    ],
    rules: {
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'default-param-last': 'off',
        // Disable this rule and use rule `prettier/prettier` instead.
        'function-paren-newline': 'off',
        'guard-for-in': 'off',
        'implicit-arrow-linebreak': 'off',
        // https://github.com/prettier/eslint-config-prettier/#max-len
        // This rule is disabled by `eslint-config-prettier`, enable it manually for better eslint error information.
        'max-len': ['error', { code: 120, ignoreUrls: true }],
        // Allows bitwise operators, but be CAREFUL for not using them in most case.
        'no-bitwise': 'off',
        'no-console': ['error', { allow: ['log', 'debug', 'info', 'warn', 'error'] }],
        'no-constant-condition': 'off',
        'no-continue': 'off',
        'no-else-return': 'off',
        'no-lonely-if': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        // https://github.com/prettier/eslint-config-prettier/#no-tabs
        // This rule is disabled by `eslint-config-prettier`, enable it manually for better eslint error informantion.
        'no-tabs': 'error',
        // Disabled for underscore prefix.
        'no-underscore-dangle': 'off',
        // https://github.com/prettier/eslint-config-prettier/#no-unexpected-multiline
        // This rule is disabled by `eslint-config-prettier`, enable it manually for better eslint error informantion.
        'no-unexpected-multiline': 'error',
        // Disable this rule and use rule `prettier/prettier` instead.
        'object-curly-newline': 'off',
        // Disable this rule and use rule `prettier/prettier` instead.
        'operator-linebreak': 'off',
        // Only enable object variable declarator.
        // From: https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v15.0.0/packages/eslint-config-airbnb-base/rules/es6.js#L123
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        // https://github.com/prettier/eslint-config-prettier/#quotes
        // This rule is disabled by `eslint-config-prettier`, enable it manually for better eslint error informantion.
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        // Disabled for better code comments
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#the-indent--typescript-eslintindent-rules
        // Disable this rule and use rule `prettier/prettier` instead.
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'accessor', format: ['camelCase'] },
            { selector: 'class', format: ['PascalCase'] },
            {
                selector: 'enum',
                // `UPPER_CASE` for constant enums.
                format: ['PascalCase', 'UPPER_CASE'],
            },
            {
                selector: 'enumMember',
                // `UPPER_CASE` for constant enum members.
                format: ['PascalCase', 'UPPER_CASE'],
            },
            {
                selector: 'function',
                // `PascalCase` for react function components.
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
            { selector: 'interface', format: ['PascalCase'], leadingUnderscore: 'allow' },
            { selector: 'method', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'property', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'typeAlias', format: ['PascalCase'], leadingUnderscore: 'allow' },
            { selector: 'typeParameter', format: ['PascalCase'] },
            {
                selector: 'variable',
                // `PascalCase` for functional components/containers or containers generated by react-redux.connect.
                // `UPPER_CASE` for constant variables.
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
        ],
        // From:
        // - https://github.com/iamturns/eslint-config-airbnb-typescript/blob/v16.1.0/lib/shared.js#L118
        // - https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v15.0.0/packages/eslint-config-airbnb-base/rules/best-practices.js#L94
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                allow: [
                    // base
                    'arrowFunctions',
                    'functions',
                    'methods',
                    // extends
                    'decoratedFunctions',
                    'private-constructors',
                    'protected-constructors',
                ],
            },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        // From:
        // - https://github.com/iamturns/eslint-config-airbnb-typescript/blob/v16.1.0/lib/shared.js#L209
        // - https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v15.0.0/packages/eslint-config-airbnb-base/rules/best-practices.js#L299
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        // `eslint-plugin-deprecation` does not support ESLint v8 yet, we can enable it when it supports ESLint v8.
        // 'deprecation/deprecation': 'warn',

        'import/extensions': 'off',
        'import/no-cycle': 'error',
        'import/no-default-export': 'error',
        // Disabled for import-statement of dev dependencies.
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',

        'jest/prefer-strict-equal': 'error',

        // Enables prettier rules.
        'prettier/prettier': 'error',

        'react/destructuring-assignment': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        // Disable this rule because we only use Typescript to write components, no need to use `prop-types`
        'react/prop-types': 'off',
        // https://github.com/yannickcr/eslint-plugin-react/blob/v7.28.0/docs/rules/react-in-jsx-scope.md
        // Disable this rule for using new JSX transform from React 17.
        'react/react-in-jsx-scope': 'off',

        // From: https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-hooks.js#L19
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'use[a-zA-Z]+Effect' }],
    },
    overrides: [
        {
            files: ['*.d.ts'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
    ],
};
