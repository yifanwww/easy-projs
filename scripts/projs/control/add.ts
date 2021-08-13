import fs from 'fs';
import path from 'path';

import { paths } from '../../paths';
import { log, LogLevel } from '../../log';
import { getTemplateProjInfos, ProjInfo, ProjInfoJson } from '../info';
import { printProjsProvided } from './help';
import { AddYargsArgv } from './types';

const undoneTemplates = ['example-browser'];

interface CopyOperation {
    src: string;
    dst: string;
}

async function copyFolder(opt: CopyOperation, ignores?: string[]): Promise<void> {
    async function copy(_opt: CopyOperation): Promise<CopyOperation | undefined> {
        const stat = await fs.promises.stat(_opt.src);
        if (stat.isFile()) {
            await fs.promises.copyFile(_opt.src, _opt.dst);
        } else if (stat.isDirectory()) {
            return _opt;
        }

        return undefined;
    }

    try {
        await fs.promises.access(opt.dst);
    } catch (err) {
        await fs.promises.mkdir(opt.dst);
    }

    const dirs = ignores
        ? (await fs.promises.readdir(opt.src)).filter((dir) => !ignores.includes(dir))
        : await fs.promises.readdir(opt.src);
    const opts = dirs.map<CopyOperation>((dir) => ({
        src: path.resolve(opt.src, dir),
        dst: path.resolve(opt.dst, dir),
    }));

    const folderOpts = (await Promise.all(opts.map(copy))).filter((r) => r !== undefined) as CopyOperation[];
    await Promise.all(folderOpts.map((_opt) => copyFolder(_opt)));
}

async function copyTemplateProj(info: ProjInfo, dst: string, name: string): Promise<void> {
    const srcProjInfoFile = path.resolve(info.path, paths.projInfoFileName);
    const srcProjInfoData = await fs.promises.readFile(srcProjInfoFile, { encoding: 'utf-8' });
    const srcProjInfo = JSON.parse(srcProjInfoData);
    const dstProjInfo: ProjInfoJson = {
        clean: srcProjInfo.clean,
        name,
        output: srcProjInfo.output,
        startup: srcProjInfo.startup,
        type: srcProjInfo.type,
    };
    await fs.promises.writeFile(path.resolve(dst, paths.projInfoFileName), JSON.stringify(dstProjInfo, null, 4));

    await copyFolder({ src: info.path, dst }, [...srcProjInfo.clean, paths.projInfoFileName]);
}

export async function add(argv: AddYargsArgv): Promise<void> {
    log.setLogLevel(LogLevel.error);
    const templateProjInfos = await getTemplateProjInfos();
    log.setLogLevel(LogLevel.info);

    const { folder, list = false, name, template } = argv;

    if (!folder || !name || !template || list) {
        printProjsProvided(templateProjInfos, undoneTemplates);
        return;
    }

    if (undoneTemplates.includes(template)) {
        log.warn(`This specified template project '${template}' is not finished.`);
        printProjsProvided(templateProjInfos, undoneTemplates);
        return;
    }

    const projInfo = templateProjInfos[template];

    if (projInfo === undefined) {
        log.error('Wrong template project name.');
        printProjsProvided(templateProjInfos, undoneTemplates);
        return;
    }

    const dst = path.resolve(paths.projects, folder);
    try {
        await fs.promises.access(dst);
        log.error('Target folder already exists, please select a new folder to place your new project.');
        return;
    } catch (err) {
        await fs.promises.mkdir(dst);
    }

    return copyTemplateProj(projInfo, dst, name);
}
