import type { Config } from 'jest';
import { createRequire } from 'node:module';

import config from './jest.config.webapp-cjs.js';

const require = createRequire(import.meta.url);

// reference: https://github.com/swc-project/jest?tab=readme-ov-file#q-jest-uses-commonjs-by-default-but-i-want-to-use-esm

function getConfig(): Config {
    return {
        ...config,

        setupFiles: [require.resolve('./jest.setup.esm.js')],

        extensionsToTreatAsEsm: ['.ts', '.tsx'],
    };
}

export default getConfig();
