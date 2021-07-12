import _yargs from 'yargs';

import { add } from './add';
import { build } from './build';
import { clean } from './clean';
import { validate } from './validate';
import { dev } from './dev';
import { exe } from './exec';

interface BaseYargsArgv {
    _: Array<string | number>;
    $0: string;
}
interface AddYargsArgv extends BaseYargsArgv {
    folder: string;
    name: string;
    template: string;
}
interface BuildYargsArgv extends BaseYargsArgv {
    all: boolean;
    name?: string;
}
interface CleanYargsArgv extends BaseYargsArgv {
    all: boolean;
    name?: string;
}
interface DevYargsArgv extends BaseYargsArgv {
    name: string;
}
interface ExecYargsArgv extends BaseYargsArgv {
    name: string;
}
interface ValidateYargsArgv extends BaseYargsArgv {}

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
                    .option('name', { string: true, alias: 'n', describe: 'The name of the new project.' })
                    .option('template', {
                        string: true,
                        alias: 't',
                        describe: 'The name of the specified template project.',
                    })
                    .demandOption(['folder', 'name', 'template']),
            withExit((argv: AddYargsArgv) => add(argv.folder, argv.name, argv.template)),
        )
        .command(
            'build [name] [options]',
            'Build a specified project, or build all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, alias: 'a', default: false, describe: 'Build all the projects.' })
                    .positional('name', { type: 'string', describe: 'The name of a project.' }),
            withExit((argv: BuildYargsArgv) => build(argv.all, argv.name ?? '')),
        )
        .command(
            'clean [name] [options]',
            'Clean a specified project, or clean all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, alias: 'a', default: false, describe: 'Clean all the projects.' })
                    .positional('name', { type: 'string', describe: 'The name of a project.' }),
            withExit((argv: CleanYargsArgv) => clean(argv.all, argv.name ?? '')),
        )
        .command(
            'dev [name]',
            'Dev a specified project.',
            (yargs) =>
                yargs.positional('name', { type: 'string', describe: 'The name of a project.' }).demandOption(['name']),
            withExit((argv: DevYargsArgv) => dev(argv.name)),
        )
        .command(
            'exec [name]',
            'Execute a specified project.',
            (yargs) =>
                yargs.positional('name', { type: 'string', describe: 'The name of a project.' }).demandOption(['name']),
            withExit((argv: ExecYargsArgv) => exe(argv.name)),
        )
        .command(
            'validate',
            'Validate all the project infos.',
            () => {},
            withExit<ValidateYargsArgv>(() => validate()),
        )
        .help();

    const args = await yargv.argv;

    if (args.h) {
        yargv.showHelp();
        process.exit();
    }
}

cli();
