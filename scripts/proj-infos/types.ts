export enum ProjType {
    /** A react browser project, compiled by cra. */
    BrowserReact = 'browser-react',
    /** A vue browser project, compiled by vite. */
    BrowserVue = 'browser-vue',
    /** A browser project, compiled by custom webpack config. */
    BrowserWebpack = 'browser-webpack',
    /** A nodejs project, compiled by tsc. */
    Nodejs = 'nodejs',
}

export interface ProjInfoJson {
    projInfo: {
        name: string;
        output: string;
        port?: number;
        startup: string;
        type: ProjType;
    };
}

export interface ProjInfo {
    folder: string;
    name: string;
    output: string;
    path: string;
    port?: number;
    startup: string;
    type: ProjType;
}

export interface ProjInfos {
    [name: string]: ProjInfo;
}

export type SwitchProjCallbacks = {
    [ProjType.BrowserReact]: (info: ProjInfo) => Promise<void>;
    [ProjType.BrowserVue]: (info: ProjInfo) => Promise<void>;
    [ProjType.BrowserWebpack]: (info: ProjInfo) => Promise<void>;
    [ProjType.Nodejs]: (info: ProjInfo) => Promise<void>;
};
