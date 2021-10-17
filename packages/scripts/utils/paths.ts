import path from 'path';

const repository = path.join(__dirname, '../../..');

const nodeModules = path.join(repository, 'node_modules');
const packages = path.join(repository, 'packages');

const scripts = path.resolve(packages, 'scripts');

export const paths = {
    repository,

    // node_modules

    nodeModules,

    // packages

    packages,

    // compilation

    reactWebpackConfig: path.resolve(scripts, 'webpack/webpack.config.js'),

    // test

    jestConfig: path.resolve(scripts, 'jest/jest.config.js'),
    testSetup: path.resolve(packages, 'utils-test/src/setup.ts'),
    transforms: {
        babel: path.resolve(scripts, 'jest/transform.babel.js'),
        css: path.resolve(scripts, 'jest/transform.css.js'),
        file: path.resolve(scripts, 'jest/transform.file.js'),
    },
};
