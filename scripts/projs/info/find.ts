import fs from 'fs';
import path from 'path';

import { paths } from '../../paths';
import { log } from '../../log';

/**
 * @returns The folder' names of projects found.
 */
export async function findProjs(): Promise<string[]> {
    async function checkProjFolder(dir: string): Promise<string | undefined> {
        const dirPath = path.resolve(paths.projects, dir);
        const stats = await fs.promises.stat(dirPath);
        return stats.isDirectory() ? dir : undefined;
    }

    const dirs = await fs.promises.readdir(paths.projects);
    const projs = (await Promise.all(dirs.map(checkProjFolder))).filter((name) => name) as string[];

    log.info(`Find ${projs.length} projects.`);

    return projs;
}

/**
 * @param projs An array contains the full path to each proj info.
 */
export async function findProjInfoFiles(projs: string[]): Promise<string[]> {
    async function findProjInfo(proj: string): Promise<boolean> {
        const projPath = path.resolve(paths.projects, proj);
        const projInfoFile = path.resolve(projPath, paths.projInfoFileName);

        try {
            const stats = await fs.promises.stat(projInfoFile);
            return stats.isFile();
        } catch (err) {
            log.warn(`No proj-info.json found in project '${projPath}'.`);
            return false;
        }
    }

    const res = await Promise.all(projs.map(findProjInfo));

    const files: string[] = [];
    for (const index in projs) {
        if (res[index] === true) {
            files.push(path.resolve(paths.projects, projs[index], paths.projInfoFileName));
        }
    }

    log.info(`Find ${files.length} project infos.`);

    return files;
}
