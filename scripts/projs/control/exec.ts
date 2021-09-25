import { log, LogLevel } from '../../log';
import { getProjInfos, ProjType } from '../info';
import { executeBrowser, executeNode } from './execute-wrapper';
import { printProjsProvided } from './help';
import { switchProj } from './switch-projs';
import { ExecYargsArgv } from './types';

export async function exec(argv: ExecYargsArgv): Promise<void> {
    log.setLogLevel(LogLevel.Error);
    const projInfos = await getProjInfos();
    log.setLogLevel(LogLevel.Info);

    const { list = false, name } = argv;

    if (list) {
        printProjsProvided(projInfos);
    } else if (!name) {
        log.warn('Specifies no project to dev.');
        printProjsProvided(projInfos);
    } else {
        return switchProj(projInfos, name, {
            [ProjType.BrowserReact]: async (info) => executeBrowser(info.startup),
            [ProjType.BrowserVue]: async (info) => log.error(info),
            [ProjType.BrowserWebpack]: async (info) => executeBrowser(info.startup),
            [ProjType.Nodejs]: async (info) => executeNode(info.startup),
        });
    }
}
