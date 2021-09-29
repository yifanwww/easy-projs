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

    // configs

    configs,

    // packages

    packages,

    // projects

    projects,

    // compilation

    reactWebpackConfig: path.resolve(scripts, 'webpack/webpack.config.js'),

    // test
};
