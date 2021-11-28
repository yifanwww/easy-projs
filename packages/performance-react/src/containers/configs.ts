import { genRouteInfos, RoutePath } from 'src/common/route';

import { ChartPage } from './ChartPage';
import { HomePage } from './HomePage';
import { TestPage } from './TestPage';

export const pages = genRouteInfos([
    { component: HomePage, path: RoutePath.HomePage, sider: 'Home' },
    { component: TestPage, path: RoutePath.TestPage, sider: 'Test' },
    { component: ChartPage, path: RoutePath.ChartPage, sider: 'Chart' },
]);

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
