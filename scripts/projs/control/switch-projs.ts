import { log } from '../../log';
import { ProjInfo, ProjInfos, ProjType, SwitchProjCallbacks } from '../info';
import { printProjsProvided } from './help';

function _switchProj(info: ProjInfo, callbacks: SwitchProjCallbacks): Promise<void> {
    let never: never;
    // prettier-ignore
    switch (info.type) {
        case ProjType.BrowserReact:     return callbacks[ProjType.BrowserReact](info);
        case ProjType.BrowserVue:       return callbacks[ProjType.BrowserVue](info);
        case ProjType.BrowserWebpack:   return callbacks[ProjType.BrowserWebpack](info);
        case ProjType.Nodejs:           return callbacks[ProjType.Nodejs](info);

        default:
            never = info.type;
            return never;
    }
}

export async function switchProj(projInfos: ProjInfos, name: string, callbacks: SwitchProjCallbacks): Promise<void> {
    if (!(name in projInfos)) {
        log.error(`Unknown project name: ${name}`);
        printProjsProvided(projInfos);
        return;
    }

    return _switchProj(projInfos[name], callbacks);
}
