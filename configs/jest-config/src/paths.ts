import path from 'node:path';

// `..` points to `<repo>/configs/jest-config`
// `../..` points to `<repo>/configs`
// `../../..` points to `<repo>`
const repo = path.join(import.meta.dirname, '../../..');

export const paths = {
    jestCache: path.resolve(repo, 'node_modules', '.cache/jest'),
};
