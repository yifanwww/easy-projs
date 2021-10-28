import { IPages, IPageInfo, PageURL } from 'src/common';

import { ChangeLevelPage } from './ChangeLevelPage';
import { ChangeMiddleComponentPage } from './ChangeMiddleComponentPage';
import { ChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { RouterLikePage } from './RouterLikePage';

export const pages: IPages = {
    '/home': {
        component: HomePage,
        url: '/home',
        sidebarName: 'Home',
    },
    '/change-level': {
        component: ChangeLevelPage,
        url: '/change-level',
        sidebarName: 'Change Level',
    },
    '/change-middle-component': {
        component: ChangeMiddleComponentPage,
        url: '/change-middle-component',
        sidebarName: 'Change Middle Component',
    },
    '/change-parent': {
        component: ChangeParentPage,
        url: '/change-parent',
        sidebarName: 'Change Parent',
    },
    '/router-like': {
        component: RouterLikePage,
        url: '/router-like',
        sidebarName: 'Router Like',
    },
};

export const pageURLs = Object.keys(pages) as PageURL[];

export const homePageURL: PageURL = '/home';

export const getPageInfo = (url: PageURL): IPageInfo => pages[url];
