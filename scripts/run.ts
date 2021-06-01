import chalk from 'chalk';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import {
    BrowserReactProjectInfo,
    BrowserVueProjectInfo,
    BrowserWebpackProjectInfo,
    NodejsProjectInfo,
    projectInfos,
} from './project-infos';

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

async function runBrowserReactProject(info: Required<BrowserReactProjectInfo>): Promise<void> {
    console.log(info);
}

async function runBrowserVueProject(info: Required<BrowserVueProjectInfo>): Promise<void> {
    console.log(info);
}

async function runBrowserWebpackProject(info: Required<BrowserWebpackProjectInfo>): Promise<void> {
    console.log(info);
}

async function runNodejsProject(info: Required<NodejsProjectInfo>): Promise<void> {
    await executeCommand('node', [info.startup]);
}

async function run(): Promise<void> {
    const { name } = parseArgs();

    if (!(name in projectInfos)) {
        console.error(chalk.whiteBright(`Unknown project name: ${name}`));
    }

    const info = projectInfos[name];

    let never: never;
    switch (info.mode) {
        case 'browser-react':
            await runBrowserReactProject(info);
            break;
        case 'browser-vue':
            await runBrowserVueProject(info);
            break;
        case 'browser-webpack':
            await runBrowserWebpackProject(info);
            break;
        case 'nodejs':
            await runNodejsProject(info);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = info;
    }
}

run();
