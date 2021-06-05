import chalk from 'chalk';
import yargs from 'yargs';

import { execute, Executor } from './execute';
import { projectInfos, ProjectType, switchProjectType } from './project-infos';

interface YargsRunArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

function parseArgs(): YargsRunArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsRunArgv;
}

async function run(): Promise<void> {
    const { name } = parseArgs();

    if (!(name in projectInfos)) {
        console.error(chalk.red(`[run] Unknown project name: ${name}`));
        return;
    }

    return switchProjectType(projectInfos[name], {
        [ProjectType.BrowserReact]: async (info) => execute(Executor.Browser, [info.startup]),
        [ProjectType.BrowserVue]: async (info) => console.log(info),
        [ProjectType.BrowserWebpack]: async (info) => execute(Executor.Browser, [info.startupProduction]),
        [ProjectType.Nodejs]: async (info) => execute(Executor.Node, [info.startup]),
    });
}

run();
