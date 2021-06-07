import { loadProjInfos } from './load-proj-infos';
import { ProjInfos } from './types';

let projInfos: ProjInfos | undefined;

export async function getProjInfos(): Promise<ProjInfos> {
    if (projInfos) return projInfos;

    projInfos = await loadProjInfos();
    return projInfos;
}
