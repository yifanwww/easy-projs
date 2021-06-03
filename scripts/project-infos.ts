import _path from 'path';

export enum ProjectType {
    BrowserReact = 'browser-react',
    BrowserVue = 'browser-vue',
    BrowserWebpack = 'browser-webpack',
    Nodejs = 'nodejs',
}

export interface CommonProjectInfo {
    name: string;
    output: string | string[];
    path?: string;
}

export interface BrowserReactProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserReact;
    startup: string;
}

export interface BrowserVueProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserVue;
}

export interface BrowserWebpackProjectInfo extends CommonProjectInfo {
    mode: ProjectType.BrowserWebpack;
}

export interface NodejsProjectInfo extends CommonProjectInfo {
    mode: ProjectType.Nodejs;
    startup: string;
}

export type ProjectInfo =
    | BrowserReactProjectInfo
    | BrowserVueProjectInfo
    | BrowserWebpackProjectInfo
    | NodejsProjectInfo;

export interface PartialProjectInfos {
    [name: string]: ProjectInfo;
}

export interface ProjectInfos {
    [name: string]: Required<ProjectInfo>;
}

const projectsDir = _path.resolve(__dirname, '../projects');

function genCommonProjectInfo(info: CommonProjectInfo): Required<CommonProjectInfo> {
    const path = _path.resolve(projectsDir, info.name);

    return {
        name: info.name,
        output: Array.isArray(info.output)
            ? info.output.map((p) => _path.resolve(path, p))
            : _path.resolve(path, info.output),
        path,
    };
}

function genBrowserReactProjectInfo(info: BrowserReactProjectInfo): Required<BrowserReactProjectInfo> {
    const common = genCommonProjectInfo(info);

    return {
        ...common,
        mode: info.mode,
        startup: `file:${_path.resolve(common.path, info.startup)}`,
    };
}

function genBrowserVueProjectInfo(info: BrowserVueProjectInfo): Required<BrowserVueProjectInfo> {
    return {
        ...genCommonProjectInfo(info),
        mode: info.mode,
    };
}

function genBrowserWebpackProjectInfo(info: BrowserWebpackProjectInfo): Required<BrowserWebpackProjectInfo> {
    return {
        ...genCommonProjectInfo(info),
        mode: info.mode,
    };
}

function genNodejsProjectInfo(info: NodejsProjectInfo): Required<NodejsProjectInfo> {
    const common = genCommonProjectInfo(info);

    return {
        ...common,
        mode: info.mode,
        startup: _path.resolve(common.path, info.startup),
    };
}

function genProjectInfos(infos: PartialProjectInfos): ProjectInfos {
    const _infos: ProjectInfos = {};

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
        output: 'build',
        startup: 'build/index.html',
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

export type SwitchProjectTypeCallbacks = {
    [ProjectType.BrowserReact]: (info: Required<BrowserReactProjectInfo>) => Promise<void>;
    [ProjectType.BrowserVue]: (info: Required<BrowserVueProjectInfo>) => Promise<void>;
    [ProjectType.BrowserWebpack]: (info: Required<BrowserWebpackProjectInfo>) => Promise<void>;
    [ProjectType.Nodejs]: (info: Required<NodejsProjectInfo>) => Promise<void>;
};

export function switchProjectType(info: Required<ProjectInfo>, callbacks: SwitchProjectTypeCallbacks): Promise<void> {
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
