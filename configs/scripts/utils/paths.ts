import path from 'path';

const repository = path.join(__dirname, '../../..');
const nodeModules = path.join(repository, 'node_modules');
const packages = path.join(repository, 'packages');
const projects = path.join(repository, 'projects');

export const paths = {
    nodeModules,
    packages,
    projects,
    repository,

    appTsBuildInfoFile: path.join(nodeModules, '.cache/tsconfig.tsbuildinfo'),
    webpackCache: path.join(nodeModules, '.cache'),
};
