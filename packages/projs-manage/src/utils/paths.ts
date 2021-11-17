import path from 'path';

const repository = path.join(__dirname, '../../../..');

const nodeModules = path.join(repository, 'node_modules');
const packages = path.join(repository, 'packages');

export const paths = {
    repository,
    nodeModules,
    packages,
};
