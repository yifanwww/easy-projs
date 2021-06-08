import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { projInfoFileName, projsDir } from '../constants';
import { getTemplateProjInfos, ProjInfo, ProjInfoJson, ProjInfos } from '../proj-infos';

const undoneTemplate = ['example-browser'];

function printHelpInfo(templateProjInfos: ProjInfos): void {
    console.info('You have the following template projects to select:');

    const templates = Object.keys(templateProjInfos).filter((name) => !undoneTemplate.includes(name));
    const maxLen = templates.reduce((prev, name) => Math.max(prev, name.length), 0);

    templates.forEach((name) =>
        console.info(`- ${name}`.padEnd(maxLen + 4) + chalk.blackBright(templateProjInfos[name].path)),
    );
}

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
    const srcProjInfoFile = path.resolve(info.path, projInfoFileName);
    const srcProjInfoData = await fs.promises.readFile(srcProjInfoFile, { encoding: 'utf-8' });
    const srcProjInfo = JSON.parse(srcProjInfoData);
    const dstProjInfo: ProjInfoJson = {
        clean: srcProjInfo.clean,
        name,
        output: srcProjInfo.output,
        startup: srcProjInfo.startup,
        type: srcProjInfo.type,
    };
    await fs.promises.writeFile(path.resolve(dst, projInfoFileName), JSON.stringify(dstProjInfo, null, 4));

    await copyFolder({ src: info.path, dst }, [...srcProjInfo.clean, projInfoFileName]);
}

export async function add(folder: string, name: string, template: string): Promise<void> {
    const templateProjInfos = await getTemplateProjInfos();

    if (undoneTemplate.includes(template)) {
        console.warn(chalk.yellow(`This specified template project '${template}' is not finished.`));
        printHelpInfo(templateProjInfos);
        return;
    }

    const projInfo = templateProjInfos[template];

    if (projInfo === undefined) {
        console.error(chalk.red('Wrong template project name.'));
        printHelpInfo(templateProjInfos);
        return;
    }

    const dst = path.resolve(projsDir, folder);
    try {
        await fs.promises.access(dst);
        console.error(chalk.red('Target folder already exists, please select a new folder to place your new project.'));
        return;
    } catch (err) {
        await fs.promises.mkdir(dst);
    }

    return copyTemplateProj(projInfo, dst, name);
}
