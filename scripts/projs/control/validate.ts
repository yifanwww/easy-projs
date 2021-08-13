import { log, LogLevel } from '../../log';
import { findProjInfoFiles, findProjs, loadProjInfos } from '../info';

export async function validate(): Promise<void> {
    log.setLogLevel(LogLevel.debug);

    const projs = await findProjs();
    const projInfoFiles = await findProjInfoFiles(projs);
    const projInfos = await loadProjInfos(projInfoFiles);

    const projInfoFilesCount = projInfoFiles.length;
    const projInfosCount = Object.keys(projInfos).length;

    if (projInfoFilesCount !== projInfosCount) {
        log.error("There are some errors in some projects' proj-info.json.");
        process.exit(-1);
    }
}