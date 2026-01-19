import { API_NAMING, recommended } from '@easy-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['coverage/', 'lib/']),
    recommended.basic,
    {
        rules: {
            '@typescript-eslint/naming-convention': API_NAMING,
        },
    },
]);
