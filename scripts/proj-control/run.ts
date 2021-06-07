import chalk from 'chalk';

import { executeBrowser, executeNode } from '../execute';
import { ProjType, switchProj } from '../proj-infos';

export async function run(name: string): Promise<void> {
    if (!name) {
        console.info(chalk.yellow('[cli] Specifies no project to run.'));
        return;
    }

    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeBrowser(info.startup),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeBrowser(info.startup),
        [ProjType.Nodejs]: async (info) => executeNode(info.startup),
    });
}
