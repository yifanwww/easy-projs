import chalk from 'chalk';

import { getProjInfos, ProjType, switchProj } from '../proj-infos';
import { executeReactAppRewired, executeTsc, executeWebpack } from './execute-wrapper';

const _build = (name: string): Promise<void> =>
    switchProj(name, {
        [ProjType.BrowserReact]: async (info) => executeReactAppRewired(true, info.path, info.output, info.port),
        [ProjType.BrowserVue]: async (info) => console.log(info),
        [ProjType.BrowserWebpack]: async (info) => executeWebpack(true, info.path, info.output, info.port),
        [ProjType.Nodejs]: async (info) => executeTsc(false, info.path),
    });

export async function build(all: boolean, name: string): Promise<void> {
    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to compile.'));
    } else {
        const projInfos = await getProjInfos();

        if (name) {
            return _build(name);
        } else {
            for (const projName in projInfos) {
                // eslint-disable-next-line no-await-in-loop
                await _build(projName);
            }
        }
    }
}
