import { genRouteInfos, RoutePath } from 'src/common/route';

import { ChangeLevelPage } from './ChangeLevelPage';
import { ChangeParentPage } from './ChangeParentPage';
import { HomePage } from './HomePage';
import { NestedFCPage } from './NestedFCPage';
import { RerenderParentPage } from './RerenderParentPage';
import { RouterPage } from './RouterPage';

export const pages = genRouteInfos([
    { component: HomePage, path: RoutePath.HomePage, sider: 'Home' },
    { component: ChangeLevelPage, path: RoutePath.ChangeLevelPage, sider: 'Change Level' },
    { component: ChangeParentPage, path: RoutePath.ChangeParentPage, sider: 'Change Parent' },
    { component: NestedFCPage, path: RoutePath.NestedFCPage, sider: 'Nested FC' },
    { component: RerenderParentPage, path: RoutePath.RerenderParentPage, sider: 'Rerender Parent' },
    { component: RouterPage, path: RoutePath.RoutePage, deepMatch: true, sider: 'Router' },
]);

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
