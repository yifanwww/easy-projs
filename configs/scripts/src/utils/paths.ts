import path from 'path';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repository = path.join(__dirname, '../../../..');

const nodeModules = path.join(repository, 'node_modules');
const packages = path.join(repository, 'packages');

const scriptsDist = path.resolve(packages, 'scripts/dist');

export const paths = {
    repository,

    // node_modules

    nodeModules,

    // packages

    packages,

    // compilation

    reactWebpackConfig: path.resolve(scriptsDist, 'webpack/webpack.config.js'),

    // test

    jestCache: path.resolve(nodeModules, '.cache/jest'),

    jestConfig: path.resolve(scriptsDist, 'jest/jest.config.js'),
    testSetup: path.resolve(packages, 'utils-test/src/setup.ts'),
    transforms: {
        babel: path.resolve(scriptsDist, 'jest/transform.babel.js'),
        css: path.resolve(scriptsDist, 'jest/transform.css.js'),
        file: path.resolve(scriptsDist, 'jest/transform.file.js'),
    },
};
