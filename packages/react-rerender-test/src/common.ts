export type PageKey = '/home' | '/change-level' | '/change-middle-component' | '/change-parent' | '/router-like';

export interface IPageInfo {
    component: React.ComponentType;
    pageKey: PageKey;
    sidebarName: string;
}

export type IPageComponents = {
    [pageKey in PageKey]: IPageInfo;
};
