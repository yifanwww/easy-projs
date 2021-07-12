import { findProjInfoFiles, findProjs } from './find';
import { loadProjInfos } from './load';
import { ProjInfos } from './types';

function projInfosFactory() {
    let projInfos: ProjInfos | undefined;

    return async (): Promise<ProjInfos> => {
        if (projInfos) return projInfos;

        const projs = await findProjs();
        const projInfoFiles = await findProjInfoFiles(projs);
        projInfos = await loadProjInfos(projInfoFiles);
        return projInfos;
    };
}

export const getProjInfos = projInfosFactory();

export async function getTemplateProjInfos(): Promise<ProjInfos> {
    const projInfos = await getProjInfos();

    const templateProjInfos: ProjInfos = {};
    for (const name in projInfos) {
        if (projInfos[name].template) {
            templateProjInfos[name] = projInfos[name];
        }
    }

    return templateProjInfos;
}
