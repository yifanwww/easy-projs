import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { CheckHasChangelogFile } from '../utils/hasChangelogFile';

import { paths } from '../utils/paths';
import { readProjectPackageInfo } from '../utils/readProjectPackageInfo';

function checkIsVersionStable(version: string): boolean {
    const major = Number.parseInt(version.split('.')[0], 10);
    return major > 0;
}

async function loadProjectInfo(dir: string) {
    const packageInfo = await readProjectPackageInfo(dir);

    return {
        hasChangelog: await CheckHasChangelogFile(dir),
        name: packageInfo.name,
        version: packageInfo.version,
    };
}

export async function listProjectsVersion(): Promise<void> {
    const items = await fs.readdir(paths.packages, 'utf-8');

    const infos = await Promise.all(items.map((item) => loadProjectInfo(path.resolve(paths.packages, item))));

    const maxNameLength = infos.reduce((maxLen, currPair) => Math.max(maxLen, currPair.name.length), 0) + 4;

    for (const info of infos) {
        const isStable = checkIsVersionStable(info.version);

        if (!info.hasChangelog) {
            console.log(info.name);
        } else {
            const version = chalk[isStable ? 'green' : 'yellow'](`v${info.version}`);
            console.log(`${info.name.padEnd(maxNameLength)}${version}`);
        }
    }
}
