import type { Config } from 'jest';
import url from 'node:url';

import config from './jest.config.node-cjs.js';

const resolve = (p: string) => url.fileURLToPath(import.meta.resolve(p));

function getConfig(): Config {
    return {
        ...config,

        transform: {
            '^.+\\.(js|mjs|cjs|ts)$': [
                resolve('@swc/jest'),
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
