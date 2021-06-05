import chalk from 'chalk';
import yargs from 'yargs';

import { executeRimraf } from './execute';
import { projsInfo } from './projs-info';

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
    if (!(name in projsInfo)) {
        console.error(chalk.red(`[easy-projs] Unknown project name: ${name}`));
        return;
    }

    const info = projsInfo[name];

    if (!Array.isArray(info.output)) {
        return executeRimraf(info.output);
    } else {
        const promises = info.output.map(executeRimraf);
        await Promise.all(promises);
    }
}

async function clean(): Promise<void> {
    const { all, name } = parseArgs();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to clean.'));
    } else if (name) {
        return _clean(name);
    } else {
        for (const projName in projsInfo) {
            // eslint-disable-next-line no-await-in-loop
            await _clean(projName);
        }
    }
}

clean();
