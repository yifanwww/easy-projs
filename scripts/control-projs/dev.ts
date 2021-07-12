import { ProjType } from '../proj-infos';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';
import { log } from '../log';
import { switchProj } from './switch-projs';

export async function dev(name: string): Promise<void> {
    return switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path, info.output, info.port),
        [ProjType.BrowserVue]: async (info) => log.error(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.output, info.port),
        [ProjType.Nodejs]: async (info) => executeTsc(true, info.path),
    });
}
