import type { Config } from 'jest';

import config from './jest.config.webapp-cjs.js';

// reference: https://github.com/swc-project/jest?tab=readme-ov-file#q-jest-uses-commonjs-by-default-but-i-want-to-use-esm

function getConfig(): Config {
    return {
        ...config,

        extensionsToTreatAsEsm: ['.ts', '.tsx'],
    };
}

export default getConfig();
