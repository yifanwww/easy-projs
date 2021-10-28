export type PageURL = '/home' | '/change-level' | '/change-middle-component' | '/change-parent' | '/router-like';

export interface IPageInfo {
    component: React.ComponentType;
    sidebarName: string;
    url: PageURL;
}

export type IPages = {
    [URL in PageURL]: IPageInfo;
};
