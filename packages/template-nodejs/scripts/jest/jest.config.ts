import { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
    rootDir: path.join(__dirname, '../..'),
    roots: ['<rootDir>/src'],

    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],

    setupFilesAfterEnv: ['<rootDir>/scripts/jest/test.setup.ts'],

    testMatch: ['<rootDir>/src/**/*.{spec,test}.ts'],
    testEnvironment: 'node',

    transform: { '^.+\\.ts$': 'ts-jest' },
    transformIgnorePatterns: ['/node_modules/'],

    modulePaths: [],
    moduleNameMapper: { '^src/(.*)$': '<rootDir>/src/$1' },
    moduleFileExtensions: ['js', 'ts'],

    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,

    globals: {
        // ts-jest configuration goes here.
        'ts-jest': {
            tsconfig: '<rootDir>/src/tsconfig.json',
        },
    },
};

// eslint-disable-next-line import/no-default-export
export default config;
