import fs from 'fs/promises';
import path from 'path';

export async function CheckHasChangelogFile(projDir: string): Promise<boolean> {
    return fs
        .access(path.resolve(projDir, 'CHANGELOG.md'))
        .then(() => true)
        .catch(() => false);
}
