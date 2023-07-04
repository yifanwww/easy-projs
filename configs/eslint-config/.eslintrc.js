const naming = [
    'error',
    { selector: 'accessor', modifiers: ['static'], format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },
    { selector: 'accessor', format: ['camelCase'], leadingUnderscore: 'forbid' },

    {
        selector: ['class', 'enum', 'interface', 'typeAlias', 'typeParameter'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
    },

    { selector: 'enumMember', format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },

    { selector: 'function', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },

    { selector: 'method', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require' },
    { selector: 'method', modifiers: ['protected'], format: ['camelCase'], leadingUnderscore: 'require' },
    { selector: 'method', format: ['camelCase'], leadingUnderscore: 'forbid' },

    { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },

    {
        selector: 'property',
        modifiers: ['private', 'static'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
    },
    {
        selector: 'property',
        modifiers: ['protected', 'static'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
    },
    { selector: 'property', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require' },
    { selector: 'property', modifiers: ['protected'], format: ['camelCase'], leadingUnderscore: 'require' },
    { selector: 'property', modifiers: ['static'], format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'forbid' },
    { selector: 'property', format: ['camelCase'], leadingUnderscore: 'forbid' },

    { selector: 'objectLiteralProperty', format: null },

    {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
    },
];

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
    plugins: ['@typescript-eslint', 'import', 'jest', 'jsx-a11y', 'node', 'prettier', 'react', 'react-hooks'],
    settings: {
        'import/internal-regex': '^src',
    },
    rules: {
        // -------------------- ESLint Built-In Rules --------------------

        // https://eslint.org/docs/latest/rules/class-methods-use-this
        'class-methods-use-this': 'off',

        // https://eslint.org/docs/latest/rules/consistent-return
        'consistent-return': 'off',

        // Disable and use rule `prettier/prettier` instead.
        // https://eslint.org/docs/latest/rules/function-paren-newline
        'function-paren-newline': 'off',

        // https://eslint.org/docs/latest/rules/guard-for-in
        'guard-for-in': 'off',

        // https://eslint.org/docs/latest/rules/implicit-arrow-linebreak
        'implicit-arrow-linebreak': 'off',

        // This rule is disabled by `eslint-config-prettier`, enable it here for better eslint error information.
        // https://github.com/prettier/eslint-config-prettier/#max-len
        // https://eslint.org/docs/latest/rules/max-len
        'max-len': ['error', { code: 120, ignoreUrls: true }],

        // https://eslint.org/docs/latest/rules/no-await-in-loop
        'no-await-in-loop': 'off',

        // Allows bitwise operators, but be CAREFUL for not using them in most case.
        // https://eslint.org/docs/latest/rules/no-bitwise
        'no-bitwise': 'off',

        // https://eslint.org/docs/latest/rules/no-console
        'no-console': ['error', {}],

        // https://eslint.org/docs/latest/rules/no-constant-condition
        'no-constant-condition': 'off',

        // https://eslint.org/docs/latest/rules/no-continue
        'no-continue': 'off',

        // https://eslint.org/docs/latest/rules/no-else-return
        'no-else-return': 'off',

        // https://eslint.org/docs/latest/rules/no-lonely-if
        'no-lonely-if': 'off',

        // https://github.com/immerjs/immer/issues/189#issuecomment-703083451
        // https://eslint.org/docs/latest/rules/no-param-reassign
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^draft'] }],

        // https://eslint.org/docs/latest/rules/no-plusplus
        'no-plusplus': 'off',

        // https://eslint.org/docs/latest/rules/no-restricted-exports
        'no-restricted-exports': [
            'error',
            {
                restrictedNamedExports: [
                    'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
                ],
            },
        ],

        // https://eslint.org/docs/latest/rules/no-restricted-syntax
        'no-restricted-syntax': 'off',

        // This rule is disabled by `eslint-config-prettier`, enable it here for better eslint error informantion.
        // https://github.com/prettier/eslint-config-prettier/#no-tabs
        // https://eslint.org/docs/latest/rules/no-tabs
        'no-tabs': 'error',

        // Disabled for underscore prefix.
        // https://eslint.org/docs/latest/rules/no-underscore-dangle
        'no-underscore-dangle': 'off',

        // This rule is disabled by `eslint-config-prettier`, enable it here for better eslint error informantion.
        // https://github.com/prettier/eslint-config-prettier/#no-unexpected-multiline
        // https://eslint.org/docs/latest/rules/no-unexpected-multiline
        'no-unexpected-multiline': 'error',

        // https://eslint.org/docs/latest/rules/no-void
        'no-void': 'off',

        // Disable and use rule `prettier/prettier` instead.
        // https://eslint.org/docs/latest/rules/object-curly-newline
        'object-curly-newline': 'off',

        // Disable and use rule `prettier/prettier` instead.
        // https://eslint.org/docs/latest/rules/operator-linebreak
        'operator-linebreak': 'off',

        // Only enable object variable declarator.
        // https://eslint.org/docs/latest/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],

        // This rule is disabled by `eslint-config-prettier`, enable it here for better eslint error informantion.
        // https://github.com/prettier/eslint-config-prettier/#quotes
        // https://eslint.org/docs/latest/rules/quotes
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

        // -------------------- TypeScript ESLint Rules --------------------

        // https://typescript-eslint.io/rules/await-thenable
        '@typescript-eslint/await-thenable': 'error',

        // Disable and use rule `prettier/prettier` instead.
        // https://typescript-eslint.io/rules/brace-style/
        '@typescript-eslint/brace-style': 'off',

        // Disable and use rule `prettier/prettier` instead.
        // https://typescript-eslint.io/rules/comma-dangle
        '@typescript-eslint/comma-dangle': 'off',

        // https://typescript-eslint.io/rules/consistent-type-exports
        '@typescript-eslint/consistent-type-exports': 'error',

        // https://typescript-eslint.io/rules/consistent-type-imports
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],

        // https://typescript-eslint.io/rules/explicit-member-accessibility
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],

        // Disable and use rule `prettier/prettier` instead.
        // https://typescript-eslint.io/rules/indent
        '@typescript-eslint/indent': 'off',

        // Disable and use rule `prettier/prettier` instead.
        // https://typescript-eslint.io/rules/lines-between-class-members
        '@typescript-eslint/lines-between-class-members': 'off',

        // https://typescript-eslint.io/rules/naming-convention
        '@typescript-eslint/naming-convention': naming,

        // https://typescript-eslint.io/rules/no-empty-function
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

        // https://typescript-eslint.io/rules/no-empty-interface
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],

        // https://typescript-eslint.io/rules/no-explicit-any
        '@typescript-eslint/no-explicit-any': 'warn',

        // https://typescript-eslint.io/rules/no-extra-non-null-assertion
        '@typescript-eslint/no-extra-non-null-assertion': 'error',

        // https://typescript-eslint.io/rules/no-floating-promises
        '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],

        // https://typescript-eslint.io/rules/no-for-in-array
        '@typescript-eslint/no-for-in-array': 'off',

        // https://typescript-eslint.io/rules/no-misused-new
        '@typescript-eslint/no-misused-new': 'error',

        // https://typescript-eslint.io/rules/no-misused-promises
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksConditionals: true,
                checksSpreads: true,
                checksVoidReturn: { attributes: false },
            },
        ],

        // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

        // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

        // https://typescript-eslint.io/rules/no-unnecessary-type-constraint
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',

        // https://typescript-eslint.io/rules/restrict-template-expressions
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            { allowNumber: true, allowBoolean: true, allowAny: false, allowNullish: true, allowRegExp: true },
        ],

        // https://typescript-eslint.io/rules/return-await
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        // https://typescript-eslint.io/rules/require-await
        '@typescript-eslint/require-await': 'error',

        // -------------------- Eslint-Plugin-Import Rules --------------------

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': 'off',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
        'import/no-cycle': 'error',

        // Disabled for import-statement of dev dependencies.
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': 'off',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], 'internal', 'parent', 'sibling'],
                pathGroups: [
                    {
                        pattern: './*.{css,scss}',
                        group: 'sibling',
                        position: 'after',
                    },
                ],
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc',
                },
                'newlines-between': 'always',
            },
        ],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
        'import/prefer-default-export': 'off',

        // -------------------- Eslint-Plugin-Jest Rules --------------------

        // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
        'jest/no-alias-methods': 'error',

        // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-strict-equal.md
        'jest/prefer-strict-equal': 'error',

        // -------------------- Eslint-Plugin-Prettier Rules --------------------

        // Enables prettier rules.
        'prettier/prettier': 'error',

        // -------------------- Eslint-Plugin-React Rules --------------------

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': 'off',

        // Disable because we only use TypeScript to write components, no need to use `prop-types`
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'off',

        // Disable this rule for using new JSX transform from React 17.
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': 'off',

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': 'off',

        // -------------------- Eslint-Plugin-React-Hooks Rules --------------------

        // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'use[a-zA-Z]+Effect' }],
    },
    overrides: [
        {
            files: ['*.d.ts'],
            rules: {
                // https://typescript-eslint.io/rules/naming-convention
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['src/**/__tests__/*.{ts,tsx}', 'src/**/*.{spec,test}.{ts,tsx}', 'test/**/*.{ts,tsx}'],
            rules: {
                // https://typescript-eslint.io/rules/dot-notation
                '@typescript-eslint/dot-notation': [
                    'error',
                    {
                        allowPrivateClassPropertyAccess: true,
                        allowProtectedClassPropertyAccess: true,
                        allowIndexSignaturePropertyAccess: true,
                    },
                ],
            },
        },
        {
            files: [
                'perf/**/*.ts',
                'src/**/__tests__/*.{ts,tsx}',
                'src/**/*.{spec,test}.{ts,tsx}',
                'test/**/*.{ts,tsx}',
            ],
            rules: {
                // https://eslint.org/docs/latest/rules/no-console
                'no-console': 'off',
            },
        },
    ],
};
