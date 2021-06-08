import chalk from 'chalk';
import { findProjInfoFiles, findProjs, loadProjInfos } from '../proj-infos';

export async function validate(): Promise<void> {
    const projs = await findProjs();
    const projInfoFiles = await findProjInfoFiles(projs);
    const projInfos = await loadProjInfos(projInfoFiles);

    const projInfoFilesCount = projInfoFiles.length;
    const projInfosCount = Object.keys(projInfos).length;

    if (projInfoFilesCount !== projInfosCount) {
        console.error(chalk.red("There are some errors in some projects' proj-info.json."));
        process.exit(-1);
    }
}
