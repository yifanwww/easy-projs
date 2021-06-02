import chalk from 'chalk';
import path from 'path';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import {
    BrowserReactProjectInfo,
    BrowserVueProjectInfo,
    BrowserWebpackProjectInfo,
    NodejsProjectInfo,
    projectInfos,
} from './project-infos';

const tsc = path.resolve(__dirname, '../node_modules/.bin/tsc.cmd');

interface YargsDevArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

function parseArgs(): YargsDevArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsDevArgv;
}

async function devBrowserReactProject(info: Required<BrowserReactProjectInfo>): Promise<void> {
    console.log(info);
}

async function devBrowserVueProject(info: Required<BrowserVueProjectInfo>): Promise<void> {
    console.log(info);
}

async function devBrowserWebpackProject(info: Required<BrowserWebpackProjectInfo>): Promise<void> {
    console.log(info);
}

async function devNodejsProject(info: Required<NodejsProjectInfo>): Promise<void> {
    await executeCommand(tsc, ['--build', info.path, '--watch']);
}

async function dev(): Promise<void> {
    const { name } = parseArgs();

    if (!(name in projectInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
    }

    const info = projectInfos[name];

    let never: never;
    switch (info.mode) {
        case 'browser-react':
            await devBrowserReactProject(info);
            break;
        case 'browser-vue':
            await devBrowserVueProject(info);
            break;
        case 'browser-webpack':
            await devBrowserWebpackProject(info);
            break;
        case 'nodejs':
            await devNodejsProject(info);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = info;
    }
}

dev();
