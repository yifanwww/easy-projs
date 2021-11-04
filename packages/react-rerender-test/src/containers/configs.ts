import { genRouteInfos, RoutePath } from 'src/common/route';

import { PrcChangeLevelPage, PtcChangeLevelPage } from './ChangeLevelPage';
import { PrcChangeParentPage, PtcChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { NestedFCPage } from './NestedFCPage';
import { PrcRerenderParentPage, PtcRerenderParentPage } from './RerenderParentPage';
import { PrcRouterPage, PtcRouterPage } from './RouterPage';

export const pages = genRouteInfos({
    [RoutePath.HomePage]: {
        component: HomePage,
        sider: 'Home',
    },
    [RoutePath.PrcChangeLevelPage]: {
        component: PrcChangeLevelPage,
        exact: true,
        sider: 'Change Level (PRC)',
    },
    [RoutePath.PtcChangeLevelPage]: {
        component: PtcChangeLevelPage,
        exact: true,
        sider: 'Change Level (PTC)',
    },
    [RoutePath.PrcChangeParentPage]: {
        component: PrcChangeParentPage,
        exact: true,
        sider: 'Change Parent (PRC)',
    },
    [RoutePath.PtcChangeParentPage]: {
        component: PtcChangeParentPage,
        exact: true,
        sider: 'Change Parent (PTC)',
    },
    [RoutePath.NestedFCPage]: {
        component: NestedFCPage,
        exact: true,
        sider: 'Nested FC',
    },
    [RoutePath.PrcRerenderParentPage]: {
        component: PrcRerenderParentPage,
        exact: true,
        sider: 'Rerender Parent (PRC)',
    },
    [RoutePath.PtcRerenderParentPage]: {
        component: PtcRerenderParentPage,
        exact: true,
        sider: 'Rerender Parent (PTC)',
    },
    [RoutePath.PrcRoutePage]: {
        component: PrcRouterPage,
        sider: 'Router (PRC)',
    },
    [RoutePath.PtcRoutePage]: {
        component: PtcRouterPage,
        sider: 'Router (PTC)',
    },
});

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
