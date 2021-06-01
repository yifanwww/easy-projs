import yargs from 'yargs';

import { buildBrowserProject } from './build.browser';
import { buildNodejsProject } from './build.nodejs';
import { buildReactProject } from './build.react';

type Mode = 'browser' | 'nodejs' | 'react';

interface YargsArgv {
    _: (string | number)[];
    $0: string;
    mode: Mode;
    path: string;
}

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
