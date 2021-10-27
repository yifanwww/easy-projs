import { IPageComponents, IPageInfo, PageKey } from 'src/common';

import { ChangeLevelPage } from './ChangeLevelPage';
import { ChangeMiddleComponentPage } from './ChangeMiddleComponentPage';
import { ChangeParentPage } from './ChangeParentPage';
import { MainPage } from './MainPage';
import { RouterLikePage } from './RouterLikePage';

export const pages: IPageComponents = {
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
    '/main': {
        component: MainPage,
        pageKey: '/main',
        sidebarName: 'Main',
    },
    '/router-like': {
        component: RouterLikePage,
        pageKey: '/router-like',
        sidebarName: 'Router Like',
    },
};

export const pageKeys = Object.keys(pages) as PageKey[];

export const getPageInfo = (key: PageKey): IPageInfo => pages[key];
