import { IPages, IPageInfo, PageURL } from 'src/common/page';

import { PrcChangeLevelPage, PtcChangeLevelPage } from './ChangeLevelPage';
import { PrcChangeParentPage, PtcChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { NestedFCPage } from './NestedFCPage';
import { PrcRerenderParentPage, PtcRerenderParentPage } from './RerenderParentPage';
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
        siderName: 'Home',
    },
    {
        component: PrcChangeLevelPage,
        url: '/prc/change-level',
        siderName: 'Change Level (PRC)',
    },
    {
        component: PtcChangeLevelPage,
        url: '/ptc/change-level',
        siderName: 'Change Level (PTC)',
    },
    {
        component: PrcChangeParentPage,
        url: '/prc/change-parent',
        siderName: 'Change Parent (PRC)',
    },
    {
        component: PtcChangeParentPage,
        url: '/ptc/change-parent',
        siderName: 'Change Parent (PTC)',
    },
    {
        component: NestedFCPage,
        url: '/nested-fc',
        siderName: 'Nested FC',
    },
    {
        component: PrcRerenderParentPage,
        url: '/prc/rerender-parent',
        siderName: 'Rerender Parent (PRC)',
    },
    {
        component: PtcRerenderParentPage,
        url: '/ptc/rerender-parent',
        siderName: 'Rerender Parent (PTC)',
    },
    {
        component: PrcRouterLikePage,
        url: '/prc/router-like',
        siderName: 'Router Like (PRC)',
    },
    {
        component: PtcRouterLikePage,
        url: '/ptc/router-like',
        siderName: 'Router Like (PTC)',
    },
]);

export const pageURLs = Object.keys(pages) as PageURL[];

export const homePageURL: PageURL = '/home';

export const getPageInfo = (url: PageURL): IPageInfo => pages[url];
