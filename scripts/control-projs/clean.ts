import chalk from 'chalk';

import { execute, Executor } from '../execute';
import { getProjInfos } from '../proj-infos';

const executeRimraf = (path: string) => execute(Executor.Rimraf, [path]);

async function _clean(name: string): Promise<void> {
    const projInfos = await getProjInfos();

    if (!(name in projInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
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
    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to clean.'));
    } else {
        const projInfos = await getProjInfos();

        if (name) {
            return _clean(name);
        } else {
            for (const projName in projInfos) {
                // eslint-disable-next-line no-await-in-loop
                await _clean(projName);
            }
        }
    }
}
