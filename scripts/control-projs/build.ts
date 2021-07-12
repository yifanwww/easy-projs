import { getProjInfos, ProjType } from '../proj-infos';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';
import { log } from '../log';
import { switchProj } from './switch-projs';

const _build = (name: string): Promise<void> =>
    switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(true, info.path, info.output, info.port),
        [ProjType.BrowserVue]: async (info) => log.error(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(true, info.path, info.output, info.port),
        [ProjType.Nodejs]: async (info) => executeTsc(false, info.path),
    });

export async function build(all: boolean, name: string): Promise<void> {
    if (!all && !name) {
        log.warn('Specifies no project to compile.');
    } else {
        const projInfos = await getProjInfos();

        if (name) {
            return _build(name);
        } else {
            for (const projName in projInfos) {
                // eslint-disable-next-line no-await-in-loop
                await _build(projName);
            }
        }
    }
}
