import { log, LogLevel } from '../../log';
import { getProjInfos } from '../info';
import { executeRimraf } from './execute-wrapper';
import { printProjsProvided } from './help';
import { CleanYargsArgv } from './types';

async function _clean(name: string): Promise<void> {
    const projInfos = await getProjInfos();

    if (!(name in projInfos)) {
        log.error(`Unknown project name: ${name}`);
        return;
    }

    const info = projInfos[name];

    if (!Array.isArray(info.clean)) {
        return executeRimraf(info.clean);
    } else {
        const promises = info.clean.map(executeRimraf);
        await Promise.all(promises);
    }
}

export async function clean(argv: CleanYargsArgv): Promise<void> {
    log.setLogLevel(LogLevel.Error);
    const projInfos = await getProjInfos();
    log.setLogLevel(LogLevel.Info);

    const { all = false, list = false, name } = argv;

    if (list) {
        printProjsProvided(projInfos);
    } else if (!all && !name) {
        log.warn('Specifies no project to clean.');
        printProjsProvided(projInfos);
    } else if (name) {
        return _clean(name);
    } else {
        for (const projName in projInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _clean(projName);
        }
    }
}
