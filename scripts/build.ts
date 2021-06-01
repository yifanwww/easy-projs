import path from 'path';
import yargs from 'yargs';

import { executeCommand } from './execute-command';
import { YargsArgv } from './types';

const tsc = path.resolve(__dirname, '../node_modules/.bin/tsc.cmd');

function parseArgs(): YargsArgv {
    return yargs
        .option('mode', {
            alias: 'm',
            demandOption: true,
            describe: 'Specifies how to compile the specified project.',
            string: true,
        })
        .option('path', {
            alias: 'p',
            demandOption: true,
            describe: 'Specifies the path to the project.',
            string: true,
        }).argv as YargsArgv;
}

export function buildBrowserProject(projectPath: string): void {
    console.log(projectPath);
}

export function buildNodejsProject(projectPath: string): void {
    executeCommand(tsc, `--build ${projectPath}`);
}

export function buildReactProject(projectPath: string): void {
    console.log(projectPath);
}

function build(): void {
    const args = parseArgs();

    let never: never;
    switch (args.mode) {
        case 'browser':
            buildBrowserProject(args.path);
            break;
        case 'nodejs':
            buildNodejsProject(args.path);
            break;
        case 'react':
            buildReactProject(args.path);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = args.mode;
    }
}

build();
