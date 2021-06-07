export enum ProjType {
    /** A react browser project, compiled by cra. */
    BrowserReact = 'browser-react',
    /** A vue browser project, compiled by vite. */
    BrowserVue = 'browser-vue',
    /** A browser project, compiled by custom webpack config. */
    BrowserWebpack = 'browser',
    /** A nodejs project, compiled by tsc. */
    Nodejs = 'nodejs',
}

export interface ProjInfoJson {
    clean: string[];
    name: string;
    output: string;
    /**
     * @default 4321
     */
    port?: number;
    startup: string;
    type: ProjType;
}

export type FinalProjInfoJson = Required<ProjInfoJson>;

export interface ProjInfo {
    clean: string[];
    folder: string;
    localhost: string;
    name: string;
    output: string;
    path: string;
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
