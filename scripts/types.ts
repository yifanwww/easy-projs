export type Mode = 'browser' | 'nodejs' | 'react';

export interface YargsBuildArgv {
    _: (string | number)[];
    $0: string;
    all: boolean | undefined;
    name: string | undefined;
}

export interface YargsRunArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

export interface CommonProjectInfo {
    name: string;
    path?: string;
}

export interface BrowserProjectInfo extends CommonProjectInfo {
    mode: 'browser';
}

export interface NodejsProjectInfo extends CommonProjectInfo {
    mode: 'nodejs';
    startup: string;
}

export interface ReactProjectInfo extends CommonProjectInfo {
    mode: 'react';
}

export type ProjectInfo = BrowserProjectInfo | NodejsProjectInfo | ReactProjectInfo;

export interface PartialProjectInfos {
    [name: string]: ProjectInfo;
}

export interface ProjectInfos {
    [name: string]: Required<ProjectInfo>;
}
