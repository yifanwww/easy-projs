import React, { lazy } from 'react';

import { RoutePath } from './RoutePath';

interface RouteConfig {
    component: React.ComponentType;
    /** Default is `false`. */
    exact?: boolean;
    path: RoutePath;
}

export interface RouteInfo {
    readonly component: React.ComponentType;
    readonly exact: boolean;
    readonly path: RoutePath;
}

function createRoutes(routes: RouteConfig[]): RouteInfo[] {
    return routes.map((route) => ({
        component: route.component,
        exact: route.exact ?? false,
        path: route.path,
    }));
}

export const routes: RouteInfo[] = createRoutes([
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
]);
