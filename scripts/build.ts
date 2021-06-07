import chalk from 'chalk';
import yargs from 'yargs';

import { executeReactAppRewired, executeTsc, executeWebpack } from './execute';
import { getProjInfos, ProjType, switchProj } from './proj-infos';

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

const _build = (name: string): Promise<void> =>
    switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(true, info.path),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(true, info.path),
        [ProjType.Nodejs]: async (info) => executeTsc(info.path, false),
    });

async function build(): Promise<void> {
    const projInfos = await getProjInfos();

    const { all, name } = parseArgs();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to compile.'));
    } else if (name) {
        return _build(name);
    } else {
        for (const projName in projInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _build(projName);
        }
    }
}

build();
