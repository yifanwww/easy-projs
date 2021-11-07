import { genRouteInfos, RoutePath } from 'src/common/route';

import { ChangeLevelPage } from './ChangeLevelPage';
import { ChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { NestedFCPage } from './NestedFCPage';
import { RerenderParentPage } from './RerenderParentPage';
import { RouterPage } from './RouterPage';

export const pages = genRouteInfos({
    [RoutePath.HomePage]: {
        component: HomePage,
        sider: 'Home',
    },
    [RoutePath.ChangeLevelPage]: {
        component: ChangeLevelPage,
        sider: 'Change Level',
    },
    [RoutePath.ChangeParentPage]: {
        component: ChangeParentPage,
        sider: 'Change Parent',
    },
    [RoutePath.NestedFCPage]: {
        component: NestedFCPage,
        sider: 'Nested FC',
    },
    [RoutePath.RerenderParentPage]: {
        component: RerenderParentPage,
        sider: 'Rerender Parent',
    },
    [RoutePath.RoutePage]: {
        component: RouterPage,
        deepMatch: true,
        sider: 'Router',
    },
});

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
