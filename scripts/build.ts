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

interface YargsBuildArgv {
    _: (string | number)[];
    $0: string;
    all: boolean | undefined;
    name: string | undefined;
}

function parseArgs(): YargsBuildArgv {
    return yargs
        .option('all', {
            alias: 'a',
            boolean: true,
            describe: 'Compiles all the projects.',
        })
        .option('name', {
            alias: 'n',
            describe: 'Specifies the name of the specified project.',
            string: true,
        }).argv as YargsBuildArgv;
}

async function buildBrowserReactProject(info: Required<BrowserReactProjectInfo>): Promise<void> {
    console.log(info);
}

async function buildBrowserVueProject(info: Required<BrowserVueProjectInfo>): Promise<void> {
    console.log(info);
}

async function buildBrowserWebpackProject(info: Required<BrowserWebpackProjectInfo>): Promise<void> {
    console.log(info);
}

async function buildNodejsProject(info: Required<NodejsProjectInfo>): Promise<void> {
    await executeCommand(tsc, ['--build', info.path]);
}

async function _build(name: string): Promise<void> {
    if (!(name in projectInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
    }

    const info = projectInfos[name];

    let never: never;
    switch (info.mode) {
        case 'browser-react':
            await buildBrowserReactProject(info);
            break;
        case 'browser-vue':
            await buildBrowserVueProject(info);
            break;
        case 'browser-webpack':
            await buildBrowserWebpackProject(info);
            break;
        case 'nodejs':
            await buildNodejsProject(info);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = info;
    }
}

async function build(): Promise<void> {
    const { all, name } = parseArgs();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to compile.'));
    } else if (all === true) {
        for (const projectName in projectInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _build(projectName);
        }
    } else {
        _build(name!);
    }
}

build();
