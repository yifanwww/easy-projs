import path from 'node:path';
import url from 'node:url';

const _dirname = url.fileURLToPath(new URL('.', import.meta.url));

// `..` points to `<repo>/configs/jest-config`
// `../..` points to `<repo>/configs`
// `../../..` points to `<repo>`
const repo = path.join(_dirname, '../../..');

export const paths = {
    jestCache: path.resolve(repo, 'node_modules', '.cache/jest'),

    testSetup: path.resolve(repo, 'packages', 'utils-test/src/setup.ts'),
};
