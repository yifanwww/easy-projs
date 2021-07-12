import { log } from '../log';
import { ProjType } from '../proj-infos';
import { executeBrowser, executeNode } from './execute-wrapper';
import { switchProj } from './switch-projs';

export async function exe(name: string): Promise<void> {
    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeBrowser(info.startup),
        [ProjType.BrowserVue]: async (info) => log.error(info),
        [ProjType.BrowserWebpack]: async (info) => executeBrowser(info.startup),
        [ProjType.Nodejs]: async (info) => executeNode(info.startup),
    });
}
