import chalk from 'chalk';

import { ProjType, switchProj } from '../proj-infos';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';

export async function dev(name: string): Promise<void> {
    if (!name) {
        console.info(chalk.yellow('[cli] Specifies no project to dev.'));
        return;
    }

    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path, info.output),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.output, info.localhost!),
        [ProjType.Nodejs]: async (info) => executeTsc(true, info.path, info.output),
    });
}
