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
        exact: true,
        sider: 'Change Level',
    },
    [RoutePath.ChangeParentPage]: {
        component: ChangeParentPage,
        exact: true,
        sider: 'Change Parent',
    },
    [RoutePath.NestedFCPage]: {
        component: NestedFCPage,
        exact: true,
        sider: 'Nested FC',
    },
    [RoutePath.RerenderParentPage]: {
        component: RerenderParentPage,
        exact: true,
        sider: 'Rerender Parent',
    },
    [RoutePath.RoutePage]: {
        component: RouterPage,
        sider: 'Router',
    },
});

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
