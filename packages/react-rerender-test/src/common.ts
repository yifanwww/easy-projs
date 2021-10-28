export type PageURL =
    | '/home'
    | '/prc/change-level'
    | '/prc/change-parent'
    | '/prc/router-like'
    | '/ptc/change-level'
    | '/ptc/change-parent'
    | '/ptc/router-like';

export interface IPageInfo {
    component: React.ComponentType;
    sidebarName: string;
    url: PageURL;
}

export type IPages = {
    [URL in PageURL]: IPageInfo;
};
