export type PageURL =
    | '/home'
    | '/nested-fc'
    | '/prc/change-level'
    | '/prc/change-parent'
    | '/prc/rerender-parent'
    | '/prc/router-like'
    | '/ptc/change-level'
    | '/ptc/change-parent'
    | '/ptc/rerender-parent'
    | '/ptc/router-like';

export interface IPageInfo {
    component: React.ComponentType;
    siderName: string;
    url: PageURL;
}

export type IPages = {
    [URL in PageURL]: IPageInfo;
};
