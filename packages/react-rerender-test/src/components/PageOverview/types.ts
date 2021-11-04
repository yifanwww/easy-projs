export type PageType = 'nil' | 'prc' | 'ptc';

export interface IPageOverview {
    desc?: string;
    title: string;
    type: PageType;
    url: string;
}
