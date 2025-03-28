import type { Config } from 'jest';
import { createRequire } from 'node:module';

import config from './jest.config.node-cjs.js';

const require = createRequire(import.meta.url);

function getConfig(): Config {
    return {
        ...config,

        transform: {
            '^.+\\.(js|mjs|cjs|ts)$': [
                require.resolve('@swc/jest'),
                {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            decorators: true,
                            dynamicImport: true,
                        },
                        transform: {
                            legacyDecorator: true,
                            decoratorMetadata: true,
                            useDefineForClassFields: true,
                        },
                        target: 'es2020',
                    },
                    isModule: true,
                },
            ],
        },
    };
}

export default getConfig();
