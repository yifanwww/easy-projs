import type { Config } from 'jest';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import { paths } from './paths.js';

const require = createRequire(import.meta.url);

function getConfig(): Config {
    const packageJson = process.env.npm_package_json;
    const packageDir = packageJson ? path.dirname(packageJson) : process.cwd();

    const packageOwnTestSetup = path.resolve(packageDir, 'src/test.setup.ts');
    const hasPackageOwnTestSetup = fs.existsSync(packageOwnTestSetup);

    return {
        rootDir: packageDir,
        roots: ['<rootDir>/src'],
        cacheDirectory: paths.jestCache,

        setupFiles: [],
        setupFilesAfterEnv: hasPackageOwnTestSetup ? [paths.testSetup, packageOwnTestSetup] : [paths.testSetup],

        collectCoverageFrom: [
            'src/**/*.ts',
            '!src/**/__mocks__/**/*.ts',
            '!src/**/__tests__/**/*.ts',
            '!src/**/*.{spec.test}.ts',
            '!src/**/*.d.ts',
            '!src/test.setup.ts',
        ],
        testMatch: ['<rootDir>/src/**/*.{spec,test}.ts'],
        testEnvironment: 'node',

        transform: {
            '^.+\\.(js|mjs|cjs|ts)$': [
                require.resolve('@swc/jest'),
                {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            decorators: false,
                            dynamicImport: true,
                        },
                        transform: {
                            legacyDecorator: false,
                            decoratorMetadata: false,
                            useDefineForClassFields: true,
                        },
                    },
                    isModule: true,
                },
            ],
        },
        transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$'],

        modulePaths: [],
        moduleNameMapper: {
            '^src/(.*)$': '<rootDir>/src/$1',
            // Pure ESM packages needs this, to make the relative import works with TypeScript source files
            '^(.*)\\.js$': ['$1.js', '$1.ts'],
        },
        moduleFileExtensions: ['js', 'json', 'node', 'ts'],

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

        // https://jestjs.io/docs/configuration/#resetmocks-boolean
        resetMocks: true,
        // https://jestjs.io/docs/configuration/#restoremocks-boolean
        restoreMocks: true,
    };
}

export default getConfig();
