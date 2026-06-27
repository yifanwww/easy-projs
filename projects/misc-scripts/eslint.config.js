import { recommended } from '@easy-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs', 'coverage/', 'lib/']),
  recommended.node,
  {
    rules: {
      // https://eslint.org/docs/latest/rules/no-console
      'no-console': 'off',
    },
  },
]);
