function buildNamingConvention(api?: boolean): ['error', ...unknown[]] {
    return [
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
        {
            selector: 'property',
            modifiers: ['static'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
        },
        {
            selector: 'property',
            format: ['camelCase', api && 'snake_case'].filter(Boolean),
            leadingUnderscore: 'forbid',
        },

        { selector: 'objectLiteralProperty', format: null },

        {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
        },
    ];
}

export const BASIC_NAMING = buildNamingConvention();
export const API_NAMING = buildNamingConvention(true);
