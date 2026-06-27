import { recommended } from '@easy-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/*.cjs', '**/*.js', '**/*.mjs', 'coverage/', 'lib/']),
  {
    settings: {
      'import/internal-regex': '^src/',
    },
  },
  recommended.react,
]);
