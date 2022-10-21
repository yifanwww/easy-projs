import { createRoutes } from '@easy-pkg/utils-react-router';
import type { RouteConfig } from '@easy-pkg/utils-react-router';
import { lazy } from 'react';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
    },
    {
        path: RoutePath.TEST,
        component: lazy(() => import(/* webpackChunkName: 'test' */ 'src/containers/TestPage')),
    },
    {
        path: RoutePath.BAR_CHART,
        component: lazy(() => import(/* webpackChunkName: 'bar-chart' */ 'src/containers/ChartPage/BarChartPage')),
    },
    {
        path: RoutePath.LINE_CHART,
        component: lazy(() => import(/* webpackChunkName: 'line-chart' */ 'src/containers/ChartPage/LineChartPage')),
    },
]);
