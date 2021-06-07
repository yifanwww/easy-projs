import yargs from 'yargs';

import { executeReactAppRewired, executeTsc, executeWebpack } from './execute';
import { ProjType, switchProj } from './proj-infos';

interface YargsDevArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

function parseArgs(): YargsDevArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsDevArgv;
}

const dev = (): Promise<void> =>
    switchProj(parseArgs().name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.localhost!),
        [ProjType.Nodejs]: async (info) => executeTsc(info.path, true),
    });

dev();
