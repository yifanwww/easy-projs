import _path from 'path';

export interface CommonProjectInfo {
    name: string;
    path?: string;
}

export interface BrowserReactProjectInfo extends CommonProjectInfo {
    mode: 'browser-react';
}

export interface BrowserVueProjectInfo extends CommonProjectInfo {
    mode: 'browser-vue';
}

export interface BrowserWebpackProjectInfo extends CommonProjectInfo {
    mode: 'browser-webpack';
}

export interface NodejsProjectInfo extends CommonProjectInfo {
    mode: 'nodejs';
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
    return {
        name: info.name,
        path: _path.resolve(projectsDir, info.name),
    };
}

function genBrowserReactProjectInfo(info: BrowserReactProjectInfo): Required<BrowserReactProjectInfo> {
    return {
        ...genCommonProjectInfo(info),
        mode: 'browser-react',
    };
}

function genBrowserVueProjectInfo(info: BrowserVueProjectInfo): Required<BrowserVueProjectInfo> {
    return {
        ...genCommonProjectInfo(info),
        mode: 'browser-vue',
    };
}

function genBrowserWebpackProjectInfo(info: BrowserWebpackProjectInfo): Required<BrowserWebpackProjectInfo> {
    return {
        ...genCommonProjectInfo(info),
        mode: 'browser-webpack',
    };
}

function genNodejsProjectInfo(info: NodejsProjectInfo): Required<NodejsProjectInfo> {
    const common = genCommonProjectInfo(info);

    return {
        ...common,
        mode: 'nodejs',
        startup: _path.resolve(common.path, info.startup),
    };
}

function genProjectInfos(infos: PartialProjectInfos): ProjectInfos {
    const _projectInfos: ProjectInfos = {};

    for (const projectName in infos) {
        const projectInfo = infos[projectName] as ProjectInfo;

        let never: never;
        switch (projectInfo.mode) {
            case 'browser-react':
                _projectInfos[projectName] = genBrowserReactProjectInfo(projectInfo);
                break;
            case 'browser-vue':
                _projectInfos[projectName] = genBrowserVueProjectInfo(projectInfo);
                break;
            case 'browser-webpack':
                _projectInfos[projectName] = genBrowserWebpackProjectInfo(projectInfo);
                break;
            case 'nodejs':
                _projectInfos[projectName] = genNodejsProjectInfo(projectInfo);
                break;

            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                never = projectInfo;
        }
    }

    return _projectInfos;
}

export const projectInfos = genProjectInfos({
    memorize: {
        mode: 'nodejs',
        name: 'Memorize',
        startup: 'build/memorize.test.js',
    },
});
