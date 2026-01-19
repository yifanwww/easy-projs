import { API_NAMING, recommended } from '@easy-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['coverage/', 'lib/']),
    recommended.node,
    {
        files: ['**/*.dto.ts'],
        rules: {
            // https://typescript-eslint.io/rules/naming-convention
            '@typescript-eslint/naming-convention': API_NAMING,
        },
    },
]);
