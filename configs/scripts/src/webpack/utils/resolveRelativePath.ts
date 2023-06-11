import fs from 'node:fs';
import path from 'node:path';

import { paths } from '../../utils';

const projDirectory = fs.realpathSync(process.cwd());

export function resolveProj(relative: string) {
    return path.resolve(projDirectory, relative);
}

export function resolveRepo(relative: string) {
    return path.resolve(paths.repository, relative);
}
