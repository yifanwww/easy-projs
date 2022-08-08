import React, { lazy } from 'react';

import { RoutePath } from './RoutePath';

export interface RouteInfo {
    component: React.ComponentType;
    exact?: boolean;
    path: RoutePath;
}

export const routes: RouteInfo[] = [
    {
        path: RoutePath.HomePage,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
        exact: true,
    },
    {
        path: RoutePath.TestPage,
        component: lazy(() => import(/* webpackChunkName: 'test' */ 'src/containers/TestPage')),
        exact: true,
    },
    {
        path: RoutePath.BarChartPage,
        component: lazy(() => import(/* webpackChunkName: 'bar-chart' */ 'src/containers/ChartPage/BarChartPage')),
        exact: true,
    },
    {
        path: RoutePath.LineChartPage,
        component: lazy(() => import(/* webpackChunkName: 'line-chart' */ 'src/containers/ChartPage/LineChartPage')),
        exact: true,
    },
];
