import chalk from 'chalk';

import { executeReactAppRewired, executeTsc, executeWebpack } from '../execute';
import { ProjType, switchProj } from '../proj-infos';

export async function dev(name: string): Promise<void> {
    if (!name) {
        console.info(chalk.yellow('[cli] Specifies no project to dev.'));
        return;
    }

    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.localhost!),
        [ProjType.Nodejs]: async (info) => executeTsc(info.path, true),
    });
}
