import chalk from 'chalk';

import { executeRimraf } from '../execute';
import { getProjInfos } from '../proj-infos';

async function _clean(name: string): Promise<void> {
    const projInfos = await getProjInfos();

    if (!(name in projInfos)) {
        console.error(chalk.red(`[cli] Unknown project name: ${name}`));
        return;
    }

    const info = projInfos[name];

    if (!Array.isArray(info.clean)) {
        return executeRimraf(info.clean);
    } else {
        const promises = info.clean.map(executeRimraf);
        await Promise.all(promises);
    }
}

export async function clean(all: boolean, name: string): Promise<void> {
    const projInfos = await getProjInfos();

    if (!all && !name) {
        console.info(chalk.yellow('[cli] Specifies no project to clean.'));
    } else if (name) {
        return _clean(name);
    } else {
        for (const projName in projInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _clean(projName);
        }
    }
}
