import { log, LogLevel } from '../../log';
import { getProjInfos, ProjInfos, ProjType } from '../info';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';
import { printProjsProvided } from './help';
import { switchProj } from './switch-projs';
import { BuildYargsArgv } from './types';

const _build = (projInfos: ProjInfos, name: string): Promise<void> =>
    switchProj(projInfos, name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(true, info.path, info.output, info.port),
        [ProjType.BrowserVue]: async (info) => log.error(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(true, info.path, info.output, info.port),
        [ProjType.Nodejs]: async (info) => executeTsc(false, info.path),
    });

export async function build(argv: BuildYargsArgv): Promise<void> {
    log.setLogLevel(LogLevel.Error);
    const projInfos = await getProjInfos();
    log.setLogLevel(LogLevel.Info);

    const { all = false, list = false, name } = argv;

    if (list) {
        printProjsProvided(projInfos);
    } else if (!all && !name) {
        log.warn('Specifies no project to compile.');
        printProjsProvided(projInfos);
    } else if (name) {
        return _build(projInfos, name);
    } else {
        for (const projName in projInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _build(projInfos, projName);
        }
    }
}
