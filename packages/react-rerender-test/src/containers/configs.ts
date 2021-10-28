import { IPages, IPageInfo, PageURL } from 'src/common';

import { PrcChangeLevelPage, PtcChangeLevelPage } from './ChangeLevelPage';
import { PrcChangeParentPage, PtcChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { PrcRouterLikePage, PtcRouterLikePage } from './RouterLikePage';

function transform(pages: IPageInfo[]): IPages {
    const _pages: Partial<IPages> = {};

    for (const page of pages) {
        _pages[page.url] = page;
    }

    return _pages as never;
}

export const pages = transform([
    {
        component: HomePage,
        url: '/home',
        sidebarName: 'Home',
    },
    {
        component: PrcChangeLevelPage,
        url: '/prc/change-level',
        sidebarName: 'PRC Change Level',
    },
    {
        component: PrcChangeParentPage,
        url: '/prc/change-parent',
        sidebarName: 'PRC Change Parent',
    },
    {
        component: PrcRouterLikePage,
        url: '/prc/router-like',
        sidebarName: 'PRC Router Like',
    },
    {
        component: PtcChangeLevelPage,
        url: '/ptc/change-level',
        sidebarName: 'PTC Change Level',
    },
    {
        component: PtcChangeParentPage,
        url: '/ptc/change-parent',
        sidebarName: 'PTC Change Parent',
    },
    {
        component: PtcRouterLikePage,
        url: '/ptc/router-like',
        sidebarName: 'PTC Router Like',
    },
]);

export const pageURLs = Object.keys(pages) as PageURL[];

export const homePageURL: PageURL = '/home';

export const getPageInfo = (url: PageURL): IPageInfo => pages[url];
