import chalk from 'chalk';

import { ProjType, switchProj } from '../proj-infos';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';

export async function dev(name: string): Promise<void> {
    if (!name) {
        console.info(chalk.yellow('Specifies no project to dev.'));
        return;
    }

    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path, info.output, info.port),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.output, info.port),
        [ProjType.Nodejs]: async (info) => executeTsc(true, info.path),
    });
}
