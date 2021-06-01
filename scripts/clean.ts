import chalk from 'chalk';
import path from 'path';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import { projectInfos } from './project-infos';

const rimraf = path.resolve(__dirname, '../node_modules/.bin/rimraf.cmd');

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
    if (!(name in projectInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
    }

    const info = projectInfos[name];

    await executeCommand(rimraf, Array.isArray(info.output) ? info.output : [info.output]);
}

async function clean(): Promise<void> {
    const { all, name } = parseArgs();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to clean.'));
    } else if (all === true) {
        for (const projectName in projectInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _clean(projectName);
        }
    } else {
        _clean(name!);
    }
}

clean();
