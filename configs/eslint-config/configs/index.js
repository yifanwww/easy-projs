import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslintConfig from './rules.eslint.js';
import importConfig from './rules.import.js';
import jestConfig from './rules.jest.js';
import periodicConfig from './rules.periodic.js';
import prettierConfig from './rules.prettier.js';
import reactConfig from './rules.react.js';
import reactHooksConfig from './rules.react-hooks.js';
import typescriptConfig from './rules.typescript.js';

export * from './naming.js';

export const recommended = {
  basic: defineConfig({
    name: 'easy-config-eslint/basic',
    extends: [
      eslintConfig,
      typescriptConfig,
      importConfig,
      jestConfig,
      prettierConfig,
      /*
       * We rarely violate these rules, disabled for better performance during development (especially during AI Agents
       * execution). We can enable them periodically to check for violations, like once a month.
       */
      // periodicConfig,
    ],
  }),
  node: defineConfig({
    name: 'easy-config-eslint/node',
    extends: [
      eslintConfig,
      typescriptConfig,
      importConfig,
      jestConfig,
      prettierConfig,
      /*
       * We rarely violate these rules, disabled for better performance during development (especially during AI Agents
       * execution). We can enable them periodically to check for violations, like once a month.
       */
      // periodicConfig,
    ],
    languageOptions: {
      globals: globals.node,
    },
  }),
  react: defineConfig({
    name: 'easy-config-eslint/react',
    extends: [
      eslintConfig,
      typescriptConfig,
      importConfig,
      jestConfig,
      reactConfig,
      reactHooksConfig,
      prettierConfig,
      /*
       * We rarely violate these rules, disabled for better performance during development (especially during AI Agents
       * execution). We can enable them periodically to check for violations, like once a month.
       */
      // periodicConfig,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  }),
};
