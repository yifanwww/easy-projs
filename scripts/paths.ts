import path from 'path';

const repository = path.join(__dirname, '..');
const nodeModules = path.join(repository, 'node_modules');
const projects = path.join(repository, 'projects');

export const paths = {
    nodeModules,
    projects,
    projInfoFileName: 'proj-info.json',
    repository,
};
