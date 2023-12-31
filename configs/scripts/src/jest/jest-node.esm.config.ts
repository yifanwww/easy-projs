import type { Config } from 'jest';

import config from './jest-node.cjs.config.js';

// reference: https://github.com/swc-project/jest?tab=readme-ov-file#q-jest-uses-commonjs-by-default-but-i-want-to-use-esm

function getConfig(): Config {
    return {
        ...config,

        extensionsToTreatAsEsm: ['.ts'],
    };
}

export default getConfig();
