import url from 'node:url';
import type { Config } from 'jest';
import config from './jest.config.webapp-cjs.js';

const resolve = (p: string) => url.fileURLToPath(import.meta.resolve(p));

// reference: https://github.com/swc-project/jest?tab=readme-ov-file#q-jest-uses-commonjs-by-default-but-i-want-to-use-esm

function getConfig(): Config {
    return {
        ...config,

        setupFiles: [resolve('./jest.setup.esm.js')],

        extensionsToTreatAsEsm: ['.ts', '.tsx'],
    };
}

export default getConfig();
