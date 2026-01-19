import { recommended } from '@easy-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([globalIgnores(['coverage/', 'lib/']), recommended.react]);
