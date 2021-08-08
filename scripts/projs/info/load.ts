import fs from 'fs';
import path from 'path';

import { log } from '../../log';
import { FinalProjInfoJson, ProjInfo, ProjInfoJson, ProjInfos } from './types';
import { validateProjInfoJson } from './validate-proj-infos';

function mergeDefaultProjInfoJson(json: ProjInfoJson): FinalProjInfoJson {
    if (json.port === undefined) json.port = 4321;
    if (json.template === undefined) json.template = false;

    return json as FinalProjInfoJson;
}

function convertJsonToProjInfo(projInfoFile: string, json: FinalProjInfoJson): ProjInfo {
    const projPath = path.resolve(projInfoFile, '..');
    const folder = path.dirname(projPath);

    return {
        clean: json.clean.map((_path) => path.resolve(projPath, _path)),
        folder,
        name: json.name,
        output: path.resolve(projPath, json.output),
        path: projPath,
        port: json.port.toString(),
        startup: path.resolve(projPath, json.startup),
        template: json.template,
        type: json.type,
    };
}

async function loadProjInfo(projInfoFile: string): Promise<ProjInfo | undefined> {
    log.debug(`Load '${projInfoFile}'.`);

    const data = await fs.promises.readFile(projInfoFile, { encoding: 'utf-8' });
    const json = JSON.parse(data);

    if (!validateProjInfoJson(json)) {
        log.warn(`Error in '${projInfoFile}'`);
        return undefined;
    }

    const finalJson = mergeDefaultProjInfoJson(json);
    return convertJsonToProjInfo(projInfoFile, finalJson);
}

/**
 * @param infoFiles The folder names of the projects.
 */
export async function loadProjInfos(infoFiles: string[]): Promise<ProjInfos> {
    const infos = (await Promise.all(infoFiles.map(loadProjInfo))).filter((info) => info !== undefined) as ProjInfo[];
    log.info(`Load ${infos.length} project infos.`);

    const projInfos: ProjInfos = {};
    for (const info of infos) projInfos[info.name] = info;
    return projInfos;
}
