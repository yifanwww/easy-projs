import chalk from 'chalk';
import _path from 'path';

export enum ProjType {
    BrowserReact = 'browser-react',
    BrowserVue = 'browser-vue',
    BrowserWebpack = 'browser-webpack',
    Nodejs = 'nodejs',
}

interface CommonProjInfo {
    name: string;
}

export interface BrowserReactProjInfo extends CommonProjInfo {
    mode: ProjType.BrowserReact;
}

export interface BrowserVueProjInfo extends CommonProjInfo {
    mode: ProjType.BrowserVue;
}

export interface BrowserWebpackProjInfo extends CommonProjInfo {
    mode: ProjType.BrowserWebpack;
}

export interface NodejsProjInfo extends CommonProjInfo {
    mode: ProjType.Nodejs;
    output: string | string[];
    startup: string;
}

interface FinalCommonProjInfo {
    name: string;
    output: string | string[];
    path: string;
}

export interface FinalBrowserReactProjInfo extends FinalCommonProjInfo {
    mode: ProjType.BrowserReact;
    startup: string;
}

export interface FinalBrowserVueProjInfo extends FinalCommonProjInfo {
    mode: ProjType.BrowserVue;
    startup: string;
}

export interface FinalBrowserWebpackProjInfo extends FinalCommonProjInfo {
    mode: ProjType.BrowserWebpack;
    startupDevelopment: string;
    startupProduction: string;
}

export interface FinalNodejsProjInfo extends FinalCommonProjInfo {
    mode: ProjType.Nodejs;
    startup: string;
}

export type ProjInfo = BrowserReactProjInfo | BrowserVueProjInfo | BrowserWebpackProjInfo | NodejsProjInfo;

export type FinalProjInfo =
    | FinalBrowserReactProjInfo
    | FinalBrowserVueProjInfo
    | FinalBrowserWebpackProjInfo
    | FinalNodejsProjInfo;

export interface ProjInfos {
    [name: string]: ProjInfo;
}

export interface FinalProjInfos {
    [name: string]: FinalProjInfo;
}

export type SwitchProjCallbacks = {
    [ProjType.BrowserReact]: (info: FinalBrowserReactProjInfo) => Promise<void>;
    [ProjType.BrowserVue]: (info: FinalBrowserVueProjInfo) => Promise<void>;
    [ProjType.BrowserWebpack]: (info: FinalBrowserWebpackProjInfo) => Promise<void>;
    [ProjType.Nodejs]: (info: FinalNodejsProjInfo) => Promise<void>;
};

function _switchProj(info: FinalProjInfo, callbacks: SwitchProjCallbacks): Promise<void> {
    let never: never;
    switch (info.mode) {
        case ProjType.BrowserReact:
            return callbacks[ProjType.BrowserReact](info);

        case ProjType.BrowserVue:
            return callbacks[ProjType.BrowserVue](info);

        case ProjType.BrowserWebpack:
            return callbacks[ProjType.BrowserWebpack](info);

        case ProjType.Nodejs:
            return callbacks[ProjType.Nodejs](info);

        default:
            never = info;
            return never;
    }
}

const projsDir = _path.resolve(__dirname, '../projects');

function genCommonProjInfo(info: CommonProjInfo, output: string | string[]): FinalCommonProjInfo {
    const path = _path.resolve(projsDir, info.name);

    return {
        name: info.name,
        output: Array.isArray(output) ? output.map((p) => _path.resolve(path, p)) : _path.resolve(path, output),
        path,
    };
}

const genStartup = (path: string, startup: string, isBrowser: boolean): string =>
    isBrowser ? `file:${_path.resolve(path, startup)}` : _path.resolve(path, startup);

const browserInfo = {
    output: 'build',
    startupDevelopment: 'http://localhost:4321',
    startupProduction: 'build/index.html',
};

function genBrowserReactProjInfo(info: BrowserReactProjInfo): FinalBrowserReactProjInfo {
    const common = genCommonProjInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genBrowserVueProjInfo(info: BrowserVueProjInfo): FinalBrowserVueProjInfo {
    const common = genCommonProjInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genBrowserWebpackProjInfo(info: BrowserWebpackProjInfo): FinalBrowserWebpackProjInfo {
    const common = genCommonProjInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startupDevelopment: browserInfo.startupDevelopment,
        startupProduction: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genNodejsProjInfo(info: NodejsProjInfo): FinalNodejsProjInfo {
    const common = genCommonProjInfo(info, info.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, info.startup, false),
    };
}

function genProjectInfos(infos: ProjInfos): FinalProjInfos {
    const _infos: FinalProjInfos = {};

    for (const name in infos) {
        const info = infos[name];

        let never: never;
        switch (info.mode) {
            case ProjType.BrowserReact:
                _infos[name] = genBrowserReactProjInfo(info);
                break;
            case ProjType.BrowserVue:
                _infos[name] = genBrowserVueProjInfo(info);
                break;
            case ProjType.BrowserWebpack:
                _infos[name] = genBrowserWebpackProjInfo(info);
                break;
            case ProjType.Nodejs:
                _infos[name] = genNodejsProjInfo(info);
                break;

            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                never = info;
        }
    }

    return _infos;
}

export const projsInfo = genProjectInfos({
    'example-browser-react': {
        mode: ProjType.BrowserReact,
        name: 'Example [browser-react]',
    },
    'example-browser-webpack': {
        mode: ProjType.BrowserWebpack,
        name: 'Example [browser-webpack]',
    },
    'example-nodejs': {
        mode: ProjType.Nodejs,
        name: 'Example [nodejs]',
        output: ['build', 'tsconfig.tsbuildinfo'],
        startup: 'build/index.js',
    },
    memorize: {
        mode: ProjType.Nodejs,
        name: 'Memorize',
        output: ['build', 'tsconfig.tsbuildinfo'],
        startup: 'build/memorize.test.js',
    },
});

export async function switchProj(name: string, callbacks: SwitchProjCallbacks) {
    if (!(name in projsInfo)) {
        console.error(chalk.red(`[easy-projs] Unknown project name: ${name}`));
        return;
    }
    return _switchProj(projsInfo[name], callbacks);
}
