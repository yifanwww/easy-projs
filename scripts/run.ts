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
        console.error(chalk.whiteBright(`Unknown project name: ${name}`));
    }

    return switchProjectType(projectInfos[name], {
        [ProjectType.BrowserReact]: async (_info) => execute(Executor.Browser, [_info.startup]),
        [ProjectType.BrowserVue]: async (_info) => console.log(_info),
        [ProjectType.BrowserWebpack]: async (_info) => console.log(_info),
        [ProjectType.Nodejs]: async (_info) => execute(Executor.Node, [_info.startup]),
    });
}

run();
