import { genRouteInfos, RoutePath } from 'src/common/route';

import { BarChartPage, LineChartPage } from './ChartPage';
import { HomePage } from './HomePage';
import { TestPage } from './TestPage';

export const pages = genRouteInfos([
    { component: HomePage, path: RoutePath.HomePage, sider: 'Home' },
    { component: TestPage, path: RoutePath.TestPage, sider: 'Test' },
    { component: BarChartPage, path: RoutePath.BarChartPage, sider: 'Bar Chart' },
    { component: LineChartPage, path: RoutePath.LineChartPage, sider: 'Line Chart' },
]);

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
