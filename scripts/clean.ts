import chalk from 'chalk';
import yargs from 'yargs';

import { executeRimraf } from './execute';
import { getProjInfos } from './proj-infos';

interface YargsCleanArgv {
    _: (string | number)[];
    $0: string;
    all: boolean | undefined;
    name: string | undefined;
}

function parseArgs(): YargsCleanArgv {
    return yargs
        .option('all', {
            alias: 'a',
            boolean: true,
            describe: 'Clean all the projects.',
        })
        .option('name', {
            alias: 'n',
            describe: 'Specifies the name of the specified project.',
            string: true,
        }).argv as YargsCleanArgv;
}

async function _clean(name: string): Promise<void> {
    const projInfos = await getProjInfos();

    if (!(name in projInfos)) {
        console.error(chalk.red(`[easy-projs] Unknown project name: ${name}`));
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

async function clean(): Promise<void> {
    const { all, name } = parseArgs();
    const projInfos = await getProjInfos();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to clean.'));
    } else if (name) {
        return _clean(name);
    } else {
        for (const projName in projInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _clean(projName);
        }
    }
}

clean();
