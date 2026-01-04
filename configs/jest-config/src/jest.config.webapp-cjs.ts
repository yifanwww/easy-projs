import type { Config } from 'jest';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import { paths } from './paths.js';

const resolve = (p: string) => url.fileURLToPath(import.meta.resolve(p));

function getConfig(): Config {
    const packageJson = process.env.npm_package_json;
    const packageDir = packageJson ? path.dirname(packageJson) : process.cwd();

    const packageOwnTestSetup = path.resolve(packageDir, 'src/test.setup.ts');
    const hasPackageOwnTestSetup = fs.existsSync(packageOwnTestSetup);

    return {
        rootDir: packageDir,
        roots: ['<rootDir>/src'],
        cacheDirectory: paths.jestCache,

        setupFiles: [resolve('./jest.setup.cjs.js')],
        setupFilesAfterEnv: hasPackageOwnTestSetup ? [packageOwnTestSetup] : [],

        collectCoverageFrom: [
            'src/**/*.{ts,tsx}',
            '!src/**/__mocks__/**/*.{ts,tsx}',
            '!src/**/__tests__/**/*.{ts,tsx}',
            '!src/**/*.{spec,test}.{ts,tsx}',
            '!src/**/*.d.ts',
            '!src/test.setup.ts',
        ],
        testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
        testEnvironment: 'jsdom',

        transform: {
            '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': [
                resolve('@swc/jest'),
                {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            decorators: false,
                            dynamicImport: true,
                        },
                        transform: {
                            react: { runtime: 'automatic' },
                            useDefineForClassFields: true,
                        },
                        target: 'es2020',
                    },
                    isModule: true,
                },
            ],
            '^.+\\.css$': resolve('./transform.css.js'),
            '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': resolve('./transform.file.js'),
        },
        transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$', '^.+\\.module\\.(css|sass|scss)$'],

        modulePaths: [],
        moduleNameMapper: {
            '^@rustresult/result$': '@rustresult/result/cjs',

            '^react-native$': 'react-native-web',
            '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
            '^src/(.*)$': '<rootDir>/src/$1',
            // Pure ESM packages needs this, to make the relative import works with TypeScript source files
            '^(.*)\\.js$': ['$1.js', '$1.ts'],
        },
        moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

        // https://jestjs.io/docs/configuration/#resetmocks-boolean
        resetMocks: true,
        // https://jestjs.io/docs/configuration/#restoremocks-boolean
        restoreMocks: true,
    };
}

export default getConfig();
