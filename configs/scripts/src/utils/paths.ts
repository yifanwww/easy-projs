import path from 'path';

// `..` points to `<repo>/packages/scripts/src`
// `../..` points to `<repo>/packages/scripts`
// `../../..` points to `<repo>/packages`
// `../../../..` points to `<repo>`
const repo = path.join(__dirname, '../../../..');

const rootNodeModules = path.join(repo, 'node_modules');

const configs = path.join(repo, 'configs');
const pkgs = path.join(repo, 'packages');
const projs = path.join(repo, 'projects');

const scriptsDist = path.resolve(configs, 'scripts/dist');

export const paths = {
    repository: repo,

    // node_modules

    rootNodeModules,

    // packages

    configs,
    pkgs,
    projs,

    // compilation

    reactWebpackConfig: path.resolve(scriptsDist, 'webpack/webpack.config.js'),

    // test

    jestCache: path.resolve(rootNodeModules, '.cache/jest'),

    jestConfig: path.resolve(scriptsDist, 'jest/jest.config.js'),
    testSetup: path.resolve(pkgs, 'utils-test/src/setup.ts'),
    transforms: {
        babel: path.resolve(scriptsDist, 'jest/transform.babel.js'),
        css: path.resolve(scriptsDist, 'jest/transform.css.js'),
        file: path.resolve(scriptsDist, 'jest/transform.file.js'),
    },
};
