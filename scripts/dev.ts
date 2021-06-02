import chalk from 'chalk';
import yargs from 'yargs';

import { execute, Executor } from './execute';
import {
    BrowserReactProjectInfo,
    BrowserVueProjectInfo,
    BrowserWebpackProjectInfo,
    NodejsProjectInfo,
    projectInfos,
} from './project-infos';

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
    await execute(Executor.ReactAppRewired, ['start', '--config-overrides', 'configs/webpack.react.config.js'], {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        EasyProjsTargetProjectPath: info.path,
    });
}

async function devBrowserVueProject(info: Required<BrowserVueProjectInfo>): Promise<void> {
    console.log(info);
}

async function devBrowserWebpackProject(info: Required<BrowserWebpackProjectInfo>): Promise<void> {
    console.log(info);
}

async function devNodejsProject(info: Required<NodejsProjectInfo>): Promise<void> {
    await execute(Executor.Tsc, ['--build', info.path, '--watch']);
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
