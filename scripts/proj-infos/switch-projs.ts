import chalk from 'chalk';

import { getProjInfos } from './get-proj-infos';
import { ProjInfo, ProjType, SwitchProjCallbacks } from './types';

function _switchProj(info: ProjInfo, callbacks: SwitchProjCallbacks): Promise<void> {
    let never: never;
    switch (info.type) {
        case ProjType.BrowserReact:
            return callbacks[ProjType.BrowserReact](info);

        case ProjType.BrowserVue:
            return callbacks[ProjType.BrowserVue](info);

        case ProjType.BrowserWebpack:
            return callbacks[ProjType.BrowserWebpack](info);

        case ProjType.Nodejs:
            return callbacks[ProjType.Nodejs](info);

        default:
            never = info.type;
            return never;
    }
}

export async function switchProj(name: string, callbacks: SwitchProjCallbacks): Promise<void> {
    const projInfos = await getProjInfos();

    if (!(name in projInfos)) {
        console.error(chalk.red(`Unknown project name: ${name}`));
        return;
    }
    return _switchProj(projInfos[name], callbacks);
}
