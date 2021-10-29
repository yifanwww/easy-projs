import { PageURL } from 'src/common';

export type PageType = 'none' | 'prc' | 'ptc';

export interface IPageOverview {
    desc?: string;
    title: string;
    type: PageType;
    url: PageURL;
}
