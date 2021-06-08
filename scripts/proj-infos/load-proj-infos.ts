import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { projsDir } from '../constants';
import { FinalProjInfoJson, ProjInfo, ProjInfoJson, ProjInfos } from './types';
import { validateProjInfoJson } from './validate-proj-infos';

/**
 * @returns The folder' names of projects found.
 */
async function findProjs(): Promise<string[]> {
    async function checkProjFolder(dir: string): Promise<string | undefined> {
        const dirPath = path.resolve(projsDir, dir);
        const stats = await fs.promises.stat(dirPath);
        return stats.isDirectory() ? dir : undefined;
    }

    const dirs = await fs.promises.readdir(projsDir);
    const folders = await Promise.all(dirs.map(checkProjFolder));

    return folders.filter((name) => name !== undefined) as string[];
}

async function findProjInfo(file: string): Promise<boolean> {
    try {
        const stats = await fs.promises.stat(file);
        return stats.isFile();
    } catch (err) {
        // Do nothing here.
    }

    return false;
}

function mergeDefaultProjInfoJson(json: ProjInfoJson): FinalProjInfoJson {
    if (json.port === undefined) json.port = 4321;
    if (json.template === undefined) json.template = false;

    return json as FinalProjInfoJson;
}

function convertJsonToProjInfo(folder: string, projPath: string, json: FinalProjInfoJson): ProjInfo {
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

async function loadProjInfo(folder: string): Promise<ProjInfo | undefined> {
    const projInfoFileName = 'proj-info.json';
    const projPath = path.resolve(projsDir, folder);
    const projInfoFile = path.resolve(projPath, projInfoFileName);

    if (!(await findProjInfo(projInfoFile))) {
        console.warn(chalk.yellow(`No proj-info.json found in project '${projPath}'.`));
        return undefined;
    }

    console.info(chalk.blackBright(`Load '${projInfoFile}'.`));

    const data = await fs.promises.readFile(projInfoFile, { encoding: 'utf-8' });
    const json = JSON.parse(data);

    if (!validateProjInfoJson(json)) {
        console.warn(chalk.yellow(`Error in proj-info.json of project '${projPath}'`));
        return undefined;
    }

    const finalJson = mergeDefaultProjInfoJson(json);
    return convertJsonToProjInfo(folder, projPath, finalJson);
}

export async function loadProjInfos(): Promise<ProjInfos> {
    const folders = await findProjs();

    console.info(chalk.blackBright(`Find ${folders.length} projects.`));

    const infosArr = (await Promise.all(folders.map(loadProjInfo))).filter((info) => info !== undefined) as ProjInfo[];
    console.info(chalk.blackBright(`Load ${infosArr.length} project infos.`));

    const infos: ProjInfos = {};
    for (const info of infosArr) infos[info.name] = info;
    return infos;
}
