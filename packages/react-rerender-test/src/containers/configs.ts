import { IPageComponents, IPageInfo, PageKey } from 'src/common';

import { ChangeLevelPage } from './ChangeLevelPage';
import { ChangeMiddleComponentPage } from './ChangeMiddleComponentPage';
import { ChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { RouterLikePage } from './RouterLikePage';

export const pages: IPageComponents = {
    '/home': {
        component: HomePage,
        pageKey: '/home',
        sidebarName: 'Home',
    },
    '/change-level': {
        component: ChangeLevelPage,
        pageKey: '/change-level',
        sidebarName: 'Change Level',
    },
    '/change-middle-component': {
        component: ChangeMiddleComponentPage,
        pageKey: '/change-middle-component',
        sidebarName: 'Change Middle Component',
    },
    '/change-parent': {
        component: ChangeParentPage,
        pageKey: '/change-parent',
        sidebarName: 'Change Parent',
    },
    '/router-like': {
        component: RouterLikePage,
        pageKey: '/router-like',
        sidebarName: 'Router Like',
    },
};

export const pageKeys = Object.keys(pages) as PageKey[];

export const HomePageKey: PageKey = '/home';

export const getPageInfo = (key: PageKey): IPageInfo => pages[key];
