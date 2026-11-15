import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import { BASIC_NAMING } from './naming.js';

export default defineConfig([
  {
    name: 'easy-config-eslint/rules-typescript',
    extends: tseslint.configs.recommended,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // https://typescript-eslint.io/rules/consistent-type-imports
      '@typescript-eslint/consistent-type-imports': 'error',

      // https://typescript-eslint.io/rules/default-param-last
      '@typescript-eslint/default-param-last': 'error',

      // https://typescript-eslint.io/rules/naming-convention
      '@typescript-eslint/naming-convention': BASIC_NAMING,

      // https://typescript-eslint.io/rules/no-empty-object-type
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],

      // https://typescript-eslint.io/rules/no-misused-promises
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksConditionals: true, checksSpreads: true, checksVoidReturn: { attributes: false } },
      ],

      // https://typescript-eslint.io/rules/no-unused-vars
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

      // https://typescript-eslint.io/rules/prefer-string-starts-ends-with
      '@typescript-eslint/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'always' }],

      // https://typescript-eslint.io/rules/restrict-template-expressions
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowAny: false, allowBoolean: true, allowNullish: true, allowNumber: true, allowRegExp: true },
      ],
    },
  },
  {
    name: 'easy-config-eslint/rules-typescript-dts',
    files: ['**/*.d.ts'],
    rules: {
      // https://typescript-eslint.io/rules/naming-convention
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]);
