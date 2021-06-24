import _yargs from 'yargs';

import { build, clean, dev, run } from './proj-control';

interface BaseYargsArgv {
    _: Array<string | number>;
    $0: string;
}
interface BuildYargsArgv extends BaseYargsArgv {
    all: boolean;
    name: string;
}
interface CleanYargsArgv extends BaseYargsArgv {
    all: boolean;
    name: string;
}
interface DevYargsArgv extends BaseYargsArgv {
    name: string;
}
interface RunYargsArgv extends BaseYargsArgv {
    name: string;
}

async function cli(): Promise<void> {
    await _yargs
        .scriptName('cli')
        .usage('$0 [command] [options]')
        .command(
            'build [name] [options]',
            'Build a specified project, or build all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, default: false, describe: 'Build all the projects.' })
                    .positional('name', { type: 'string', default: '', describe: 'The name of a project.' }),
            (argv: BuildYargsArgv) => build(argv.all, argv.name),
        )
        .command(
            'clean [name] [options]',
            'Clean a specified project, or clean all the projects.',
            (yargs) =>
                yargs
                    .option('all', { boolean: true, default: false, describe: 'Clean all the projects.' })
                    .positional('name', { type: 'string', default: '', describe: 'The name of a project.' }),
            (argv: CleanYargsArgv) => clean(argv.all, argv.name),
        )
        .command(
            'dev [name]',
            'Dev a specified project.',
            (yargs) => yargs.positional('name', { type: 'string', default: '', describe: 'The name of a project.' }),
            (argv: DevYargsArgv) => dev(argv.name),
        )
        .command(
            'run [name]',
            'Run a specified project.',
            (yargs) => yargs.positional('name', { type: 'string', default: '', describe: 'The name of a project.' }),
            (argv: RunYargsArgv) => run(argv.name),
        )
        .help().argv;
}

cli();