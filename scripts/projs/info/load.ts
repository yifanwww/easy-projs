import fs from 'fs';
import path from 'path';

import { JsonValidator } from '../../json-schemas';
import { log } from '../../log';
import { paths } from '../../paths';
import { FinalProjInfoJson, ProjInfo, ProjInfoJson, ProjInfos } from './types';

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

async function loadProjInfo(validator: JsonValidator<ProjInfoJson>, projInfoFile: string): Promise<ProjInfo | null> {
    log.debug(`Load '${projInfoFile}'.`);

    const data = await fs.promises.readFile(projInfoFile, { encoding: 'utf-8' });
    const json = JSON.parse(data);

    const result = await validator.getResult(json);

    if (!validator.is(json, result)) {
        log.warn(`Error in '${projInfoFile}'`);
        return null;
    }

    const finalJson = mergeDefaultProjInfoJson(json);
    return convertJsonToProjInfo(projInfoFile, finalJson);
}

/**
 * @param infoFiles The folder names of the projects.
 */
export async function loadProjInfos(infoFiles: string[]): Promise<ProjInfos> {
    const validator = new JsonValidator<ProjInfoJson>(
        path.join(paths.repository, 'scripts/json-schemas/proj-info.schema.json'),
    );
    await validator.initialize();

    const infos = await Promise.all(infoFiles.map((file) => loadProjInfo(validator, file)));
    const filteredInfos = infos.filter((info) => info !== null) as ProjInfo[];
    log.info(`Load ${filteredInfos.length} project infos.`);

    const projInfos: ProjInfos = {};
    for (const info of filteredInfos) projInfos[info.name] = info;
    return projInfos;
}
