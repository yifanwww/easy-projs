import chalk from 'chalk';

import { execute, Executor } from '../execute';
import { ProjType, switchProj } from '../proj-infos';

const executeBrowser = (path: string) => execute(Executor.Browser, [path]);

const executeNode = (path: string) => execute(Executor.Node, [path]);

export async function exe(name: string): Promise<void> {
    if (!name) {
        console.info(chalk.yellow('Specifies no project to run.'));
        return;
    }

    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeBrowser(info.startup),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeBrowser(info.startup),
        [ProjType.Nodejs]: async (info) => executeNode(info.startup),
    });
}
