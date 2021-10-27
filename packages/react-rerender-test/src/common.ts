export type PageKey = '/change-level' | '/change-middle-component' | '/change-parent' | '/main' | '/router-like';

export interface IPageInfo {
    component: React.ComponentType;
    pageKey: PageKey;
    sidebarName: string;
}

export type IPageComponents = {
    [pageKey in PageKey]: IPageInfo;
};
