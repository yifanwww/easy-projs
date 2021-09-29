import path from 'path';

const repository = path.join(__dirname, '../../..');

const nodeModules = path.join(repository, 'node_modules');
const configs = path.join(repository, 'configs');
const packages = path.join(repository, 'packages');
const projects = path.join(repository, 'projects');

const scripts = path.resolve(configs, 'scripts');

export const paths = {
    repository,

    // node_modules

    nodeModules,

    // configs & packages & projects

    configs,
    packages,
    projects,

    // compilation

    reactWebpackConfig: path.resolve(scripts, 'webpack/webpack.config.js'),

    // test

    jestConfig: path.resolve(scripts, 'jest/jest.config.js'),
    testSetup: path.resolve(scripts, 'jest/test.setup.ts'),
    transforms: {
        babel: path.resolve(scripts, 'jest/transform.babel.js'),
        css: path.resolve(scripts, 'jest/transform.css.js'),
        file: path.resolve(scripts, 'jest/transform.file.js'),
    },
};
