import yargs from 'yargs';

import { executeCommand } from './execute-command';
import { YargsArgv } from './types';

function parseArgs(): YargsArgv {
    return yargs
        .option('mode', {
            alias: 'm',
            demandOption: true,
            describe: 'Specifies how to execute the specified project.',
            string: true,
        })
        .option('path', {
            alias: 'p',
            demandOption: true,
            describe: 'Specifies the path to the project or the startup file.',
            string: true,
        }).argv as YargsArgv;
}

export function runBrowserProject(projectPath: string): void {
    console.log(projectPath);
}

export function runNodejsProject(projectPath: string): void {
    executeCommand('node', projectPath);
}

export function runReactProject(projectPath: string): void {
    console.log(projectPath);
}

export function run(): void {
    const args = parseArgs();

    let never: never;
    switch (args.mode) {
        case 'browser':
            runBrowserProject(args.path);
            break;
        case 'nodejs':
            runNodejsProject(args.path);
            break;
        case 'react':
            runReactProject(args.path);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = args.mode;
    }
}

run();
