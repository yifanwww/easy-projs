import chalk from 'chalk';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import { projectInfos } from './project-infos';
import { YargsRunArgv } from './types';

function parseArgs(): YargsRunArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsRunArgv;
}

async function runBrowserProject(projectPath: string): Promise<void> {
    console.log(projectPath);
}

async function runNodejsProject(projectPath: string): Promise<void> {
    await executeCommand('node', projectPath);
}

async function runReactProject(projectPath: string): Promise<void> {
    console.log(projectPath);
}

async function run(): Promise<void> {
    const { name } = parseArgs();

    if (!(name in projectInfos)) {
        console.error(chalk.whiteBright(`Unknown project name: ${name}`));
    }

    const projectInfo = projectInfos[name];

    let never: never;
    switch (projectInfo.mode) {
        case 'browser':
            await runBrowserProject(projectInfo.path);
            break;
        case 'nodejs':
            await runNodejsProject(projectInfo.startup);
            break;
        case 'react':
            await runReactProject(projectInfo.path);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = projectInfo;
    }
}

run();
