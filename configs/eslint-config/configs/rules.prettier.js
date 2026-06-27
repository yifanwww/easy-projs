import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    name: 'easy-config-eslint/rules-prettier',
    extends: [prettierConfig],
    rules: {
      // https://github.com/prettier/eslint-plugin-prettier
      'prettier/prettier': 'off',
    },
  },
]);
