import _yargs from 'yargs';

import { add, build, clean, validate, dev, exe } from './control-projs';

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
interface ExeYargsArgv extends BaseYargsArgv {
    name: string;
}

async function cli(): Promise<void> {
    await _yargs
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
            (argv: AddYargsArgv) => add(argv.folder, argv.name, argv.template),
        )
        .command(
            'build [name] [options]',
            'Build a specified project, or build all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, alias: 'a', default: false, describe: 'Build all the projects.' })
                    .positional('name', { type: 'string', describe: 'The name of a project.' }),
            (argv: BuildYargsArgv) => build(argv.all, argv.name ?? ''),
        )
        .command(
            'clean [name] [options]',
            'Clean a specified project, or clean all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, alias: 'a', default: false, describe: 'Clean all the projects.' })
                    .positional('name', { type: 'string', describe: 'The name of a project.' }),
            (argv: CleanYargsArgv) => clean(argv.all, argv.name ?? ''),
        )
        .command(
            'dev [name]',
            'Dev a specified project.',
            (yargs) =>
                yargs.positional('name', { type: 'string', describe: 'The name of a project.' }).demandOption(['name']),
            (argv: DevYargsArgv) => dev(argv.name),
        )
        .command(
            'exe [name]',
            'Execute a specified project.',
            (yargs) =>
                yargs.positional('name', { type: 'string', describe: 'The name of a project.' }).demandOption(['name']),
            (argv: ExeYargsArgv) => exe(argv.name),
        )
        .command(
            'validate',
            'Validate all the project infos.',
            () => {},
            () => validate(),
        )
        .help().argv;
}

cli();
