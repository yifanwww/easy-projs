import { log, LogLevel } from '../../log';
import { getProjInfos, ProjType } from '../info';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';
import { switchProj } from './switch-projs';
import { DevYargsArgv } from './types';
import { printProjsProvided } from './help';

export async function dev(argv: DevYargsArgv): Promise<void> {
    log.setLogLevel(LogLevel.error);
    const projInfos = await getProjInfos();
    log.setLogLevel(LogLevel.info);

    const { list = false, name } = argv;

    if (list) {
        printProjsProvided(projInfos);
    } else if (!name) {
        log.warn('Specifies no project to dev.');
        printProjsProvided(projInfos);
    } else {
        return switchProj(projInfos, name, {
            [ProjType.BrowserReact]: async (info) => executeReactAppRewired(false, info.path, info.output, info.port),
            [ProjType.BrowserVue]: async (info) => log.error(info),
            [ProjType.BrowserWebpack]: async (info) => executeWebpack(false, info.path, info.output, info.port),
            [ProjType.Nodejs]: async (info) => executeTsc(true, info.path),
        });
    }
}
