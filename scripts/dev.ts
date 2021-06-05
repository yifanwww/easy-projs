import yargs from 'yargs';

import { executeReactAppRewired, executeTsc, executeWebpack } from './execute';
import { ProjectType, switchProject } from './project-infos';

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
    switchProject(parseArgs().name, {
        [ProjectType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path),
        [ProjectType.BrowserVue]: async (info) => console.log(info),
        [ProjectType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.startupDevelopment),
        [ProjectType.Nodejs]: async (info) => executeTsc(info.path, true),
    });

dev();
