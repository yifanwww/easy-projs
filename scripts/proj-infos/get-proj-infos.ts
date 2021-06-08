import { findProjInfoFiles, findProjs } from './find';
import { loadProjInfos } from './load-proj-infos';
import { ProjInfos } from './types';

let projInfos: ProjInfos | undefined;

export async function getProjInfos(): Promise<ProjInfos> {
    if (projInfos) return projInfos;

    const projs = await findProjs();
    const projInfoFiles = await findProjInfoFiles(projs);
    projInfos = await loadProjInfos(projInfoFiles);
    return projInfos;
}
