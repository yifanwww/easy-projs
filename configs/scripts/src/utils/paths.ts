import path from 'node:path';
import url from 'node:url';

const _dirname = url.fileURLToPath(new URL('.', import.meta.url));

// `..` points to `<repo>/configs/scripts/src`
// `../..` points to `<repo>/configs/scripts`
// `../../..` points to `<repo>/configs`
// `../../../..` points to `<repo>`
const repo = path.join(_dirname, '../../../..');

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
