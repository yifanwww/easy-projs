import yargs from 'yargs';

import { executeBrowser, executeNode } from './execute';
import { ProjType, switchProj } from './projs-info';

interface YargsRunArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

function parseArgs(): YargsRunArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsRunArgv;
}

const run = (): Promise<void> =>
    switchProj(parseArgs().name, {
        [ProjType.BrowserReact]: async (info) => executeBrowser(info.startup),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeBrowser(info.startupProduction),
        [ProjType.Nodejs]: async (info) => executeNode(info.startup),
    });

run();
