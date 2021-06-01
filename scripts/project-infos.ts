import _path from 'path';

import {
    BrowserProjectInfo,
    CommonProjectInfo,
    NodejsProjectInfo,
    PartialProjectInfos,
    ProjectInfo,
    ProjectInfos,
    ReactProjectInfo,
} from './types';

const projectsDir = _path.resolve(__dirname, '../projects');

function genCommonProjectInfo(projectInfo: CommonProjectInfo): Required<CommonProjectInfo> {
    return {
        name: projectInfo.name,
        path: _path.resolve(projectsDir, projectInfo.name),
    };
}

function genBrowserProjectInfos(projectInfo: BrowserProjectInfo): Required<BrowserProjectInfo> {
    return {
        ...genCommonProjectInfo(projectInfo),
        mode: 'browser',
    };
}

function genNodejsProjectInfos(projectInfo: NodejsProjectInfo): Required<NodejsProjectInfo> {
    const common = genCommonProjectInfo(projectInfo);

    return {
        ...common,
        mode: 'nodejs',
        startup: _path.resolve(common.path, projectInfo.startup),
    };
}

function genReactProjectInfos(projectInfo: ReactProjectInfo): Required<ReactProjectInfo> {
    return {
        ...genCommonProjectInfo(projectInfo),
        mode: 'react',
    };
}

function genProjectInfos(projectInfos: PartialProjectInfos): ProjectInfos {
    const _projectInfos: ProjectInfos = {};

    for (const projectName in projectInfos) {
        const projectInfo = projectInfos[projectName] as ProjectInfo;

        let never: never;
        switch (projectInfo.mode) {
            case 'browser':
                _projectInfos[projectName] = genBrowserProjectInfos(projectInfo);
                break;
            case 'nodejs':
                _projectInfos[projectName] = genNodejsProjectInfos(projectInfo);
                break;
            case 'react':
                _projectInfos[projectName] = genReactProjectInfos(projectInfo);
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
