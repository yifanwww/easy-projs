import chalk from 'chalk';
import _path from 'path';

export enum ProjectType {
    BrowserReact = 'browser-react',
    BrowserVue = 'browser-vue',
    BrowserWebpack = 'browser-webpack',
    Nodejs = 'nodejs',
}

interface CommonProjectInfo {
    name: string;
}

export interface BrowserReactProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserReact;
}

export interface BrowserVueProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserVue;
}

export interface BrowserWebpackProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserWebpack;
}

export interface NodejsProjectInfo extends CommonProjectInfo {
    mode: ProjectType.Nodejs;
    output: string | string[];
    startup: string;
}

interface FinalCommonProjectInfo {
    name: string;
    output: string | string[];
    path: string;
}

export interface FinalBrowserReactProjectInfo extends FinalCommonProjectInfo {
    mode: ProjectType.BrowserReact;
    startup: string;
}

export interface FinalBrowserVueProjectInfo extends FinalCommonProjectInfo {
    mode: ProjectType.BrowserVue;
    startup: string;
}

export interface FinalBrowserWebpackProjectInfo extends FinalCommonProjectInfo {
    mode: ProjectType.BrowserWebpack;
    startupDevelopment: string;
    startupProduction: string;
}

export interface FinalNodejsProjectInfo extends FinalCommonProjectInfo {
    mode: ProjectType.Nodejs;
    startup: string;
}

export type ProjectInfo =
    | BrowserReactProjectInfo
    | BrowserVueProjectInfo
    | BrowserWebpackProjectInfo
    | NodejsProjectInfo;

export type FinalProjectInfo =
    | FinalBrowserReactProjectInfo
    | FinalBrowserVueProjectInfo
    | FinalBrowserWebpackProjectInfo
    | FinalNodejsProjectInfo;

export interface ProjectInfos {
    [name: string]: ProjectInfo;
}

export interface FinalProjectInfos {
    [name: string]: FinalProjectInfo;
}

export type SwitchProjectCallbacks = {
    [ProjectType.BrowserReact]: (info: FinalBrowserReactProjectInfo) => Promise<void>;
    [ProjectType.BrowserVue]: (info: FinalBrowserVueProjectInfo) => Promise<void>;
    [ProjectType.BrowserWebpack]: (info: FinalBrowserWebpackProjectInfo) => Promise<void>;
    [ProjectType.Nodejs]: (info: FinalNodejsProjectInfo) => Promise<void>;
};

function _switchProject(info: FinalProjectInfo, callbacks: SwitchProjectCallbacks): Promise<void> {
    let never: never;
    switch (info.mode) {
        case ProjectType.BrowserReact:
            return callbacks[ProjectType.BrowserReact](info);

        case ProjectType.BrowserVue:
            return callbacks[ProjectType.BrowserVue](info);

        case ProjectType.BrowserWebpack:
            return callbacks[ProjectType.BrowserWebpack](info);

        case ProjectType.Nodejs:
            return callbacks[ProjectType.Nodejs](info);

        default:
            never = info;
            return never;
    }
}

const projectsDir = _path.resolve(__dirname, '../projects');

function genCommonProjectInfo(info: CommonProjectInfo, output: string | string[]): FinalCommonProjectInfo {
    const path = _path.resolve(projectsDir, info.name);

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

function genBrowserReactProjectInfo(info: BrowserReactProjectInfo): FinalBrowserReactProjectInfo {
    const common = genCommonProjectInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genBrowserVueProjectInfo(info: BrowserVueProjectInfo): FinalBrowserVueProjectInfo {
    const common = genCommonProjectInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genBrowserWebpackProjectInfo(info: BrowserWebpackProjectInfo): FinalBrowserWebpackProjectInfo {
    const common = genCommonProjectInfo(info, browserInfo.output);

    return {
        ...common,
        mode: info.mode,
        startupDevelopment: browserInfo.startupDevelopment,
        startupProduction: genStartup(common.path, browserInfo.startupProduction, true),
    };
}

function genNodejsProjectInfo(info: NodejsProjectInfo): FinalNodejsProjectInfo {
    const common = genCommonProjectInfo(info, info.output);

    return {
        ...common,
        mode: info.mode,
        startup: genStartup(common.path, info.startup, false),
    };
}

function genProjectInfos(infos: ProjectInfos): FinalProjectInfos {
    const _infos: FinalProjectInfos = {};

    for (const name in infos) {
        const info = infos[name];

        let never: never;
        switch (info.mode) {
            case ProjectType.BrowserReact:
                _infos[name] = genBrowserReactProjectInfo(info);
                break;
            case ProjectType.BrowserVue:
                _infos[name] = genBrowserVueProjectInfo(info);
                break;
            case ProjectType.BrowserWebpack:
                _infos[name] = genBrowserWebpackProjectInfo(info);
                break;
            case ProjectType.Nodejs:
                _infos[name] = genNodejsProjectInfo(info);
                break;

            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                never = info;
        }
    }

    return _infos;
}

export const projectInfos = genProjectInfos({
    'example-browser-react': {
        mode: ProjectType.BrowserReact,
        name: 'Example [browser-react]',
    },
    'example-browser-webpack': {
        mode: ProjectType.BrowserWebpack,
        name: 'Example [browser-webpack]',
    },
    'example-nodejs': {
        mode: ProjectType.Nodejs,
        name: 'Example [nodejs]',
        output: ['build', 'tsconfig.tsbuildinfo'],
        startup: 'build/index.js',
    },
    memorize: {
        mode: ProjectType.Nodejs,
        name: 'Memorize',
        output: ['build', 'tsconfig.tsbuildinfo'],
        startup: 'build/memorize.test.js',
    },
});

export async function switchProject(name: string, callbacks: SwitchProjectCallbacks) {
    if (!(name in projectInfos)) {
        console.error(chalk.red(`[easy-projs] Unknown project name: ${name}`));
        return;
    }
    return _switchProject(projectInfos[name], callbacks);
}
