import yargs from 'yargs';

import { commands } from './commands';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs
    .command(commands as never)
    .demandCommand()
    .strictCommands()
    .option('quiet', {
        alias: 'q',
        type: 'boolean',
        description: 'Suppress verbose output',
        default: false,
    })
    .scriptName('easy')
    .version(false)
    .help().argv;
