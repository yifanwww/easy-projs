import { defineConfig } from 'eslint/config';
import globals from 'globals';
import eslintConfig from './rules.eslint.js';
import importConfig from './rules.import.js';
import jestConfig from './rules.jest.js';
import prettierConfig from './rules.prettier.js';
import reactConfig from './rules.react.js';
import reactHooksConfig from './rules.react-hooks.js';
import typescriptConfig from './rules.typescript.js';
import vitestConfig from './rules.vitest.js';

export * from './naming.js';

export const recommended = {
  basic: defineConfig({
    name: 'easy-config-eslint/basic',
    extends: [eslintConfig, typescriptConfig, importConfig, prettierConfig],
  }),
  node: defineConfig({
    name: 'easy-config-eslint/node',
    extends: [eslintConfig, typescriptConfig, importConfig, prettierConfig],
    languageOptions: {
      globals: globals.node,
    },
  }),
  react: defineConfig({
    name: 'easy-config-eslint/react',
    extends: [eslintConfig, typescriptConfig, importConfig, reactConfig, reactHooksConfig, prettierConfig],
    languageOptions: {
      globals: globals.browser,
    },
  }),
  jest: jestConfig,
  vitest: vitestConfig,
};
