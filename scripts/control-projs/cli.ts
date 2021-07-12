import _yargs from 'yargs';

import { add } from './add';
import { build } from './build';
import { clean } from './clean';
import { validate } from './validate';
import { dev } from './dev';
import { exec } from './exec';

function withExit<T>(func: (argv: T) => void | Promise<void>): (argv: T) => Promise<void> {
    return async (argv) => {
        await func(argv);
        process.exit(0);
    };
}

async function cli(): Promise<void> {
    const yargv = _yargs
        .scriptName('cli')
        .usage('$0 [command] [options]')
        .command(
            'add [folder] [options]',
            'Add a new project based on an existing template project.',
            (yargs) =>
                yargs
                    .positional('folder', { type: 'string', describe: 'The folder name of the new project.' })
                    .options({
                        list: { boolean: true, alias: 'l', describe: 'List the template projects you can use.' },
                        name: { string: true, alias: 'n', describe: 'The name of the new project.' },
                        template: {
                            string: true,
                            alias: 't',
                            describe: 'The name of the specified template project.',
                        },
                    })
                    .conflicts('list', ['folder', 'name', 'template']),
            withExit(add),
        )
        .command(
            'build [name] [options]',
            'Build a specified project, or build all the projects.',
            (yargs) =>
                yargs
                    .options({
                        all: { boolean: true, alias: 'a', describe: 'Build all the projects.' },
                        list: { boolean: true, alias: 'l', describe: 'List the projects you can build.' },
                    })
                    .positional('name', { type: 'string', describe: 'The name of a project.' })
                    .conflicts({
                        all: ['name', 'list'],
                        name: ['list'],
                    }),
            withExit(build),
        )
        .command(
            'clean [name] [options]',
            'Clean a specified project, or clean all the projects.',
            (yargs) =>
                yargs
                    .options({
                        all: { boolean: true, alias: 'a', default: false, describe: 'Clean all the projects.' },
                        list: { boolean: true, alias: 'l', describe: 'List the projects you can clean.' },
                    })
                    .positional('name', { type: 'string', describe: 'The name of a project.' })
                    .conflicts({
                        all: ['name', 'list'],
                        name: ['list'],
                    }),
            withExit(clean),
        )
        .command(
            'dev [name]',
            'Dev a specified project.',
            (yargs) =>
                yargs
                    .options({
                        list: { boolean: true, alias: 'l', describe: 'List the projects you can dev.' },
                    })
                    .positional('name', { type: 'string', describe: 'The name of a project.' })
                    .conflicts('list', ['name']),
            withExit(dev),
        )
        .command(
            'exec [name]',
            'Execute a specified project.',
            (yargs) =>
                yargs
                    .options({
                        list: { boolean: true, alias: 'l', describe: 'List the projects you can execute.' },
                    })
                    .positional('name', { type: 'string', describe: 'The name of a project.' })
                    .conflicts('list', ['name']),
            withExit(exec),
        )
        .command('validate', 'Validate all the project infos.', () => {}, withExit(validate))
        .help();

    await yargv.argv;

    yargv.showHelp();
}

cli();
