import chalk from 'chalk';
import path from 'path';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import { projectInfos } from './project-infos';

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

async function buildBrowserProject(projectPath: string): Promise<void> {
    console.log(projectPath);
}

async function buildNodejsProject(projectPath: string): Promise<void> {
    await executeCommand(tsc, `--build ${projectPath}`);
}

async function buildReactProject(projectPath: string): Promise<void> {
    console.log(projectPath);
}

async function _build(name: string): Promise<void> {
    if (!(name in projectInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
    }

    const projectInfo = projectInfos[name];

    let never: never;
    switch (projectInfo.mode) {
        case 'browser':
            await buildBrowserProject(projectInfo.path);
            break;
        case 'nodejs':
            await buildNodejsProject(projectInfo.path);
            break;
        case 'react':
            await buildReactProject(projectInfo.path);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = projectInfo;
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
