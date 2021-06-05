import yargs from 'yargs';

import { executeBrowser, executeNode } from './execute';
import { ProjectType, switchProject } from './project-infos';

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
    switchProject(parseArgs().name, {
        [ProjectType.BrowserReact]: async (info) => executeBrowser(info.startup),
        [ProjectType.BrowserVue]: async (info) => console.log(info),
        [ProjectType.BrowserWebpack]: async (info) => executeBrowser(info.startupProduction),
        [ProjectType.Nodejs]: async (info) => executeNode(info.startup),
    });

run();
