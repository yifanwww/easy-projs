import React, { lazy } from 'react';

import { RoutePath } from './RoutePath';

interface RouteConfig {
    component: React.ComponentType;
    /** Default is `false`. */
    exact?: boolean;
    path: RoutePath;
}

export interface RouteInfo {
    component: React.ComponentType;
    exact: boolean;
    path: RoutePath;
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
        path: RoutePath.Home,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
        exact: true,
    },
]);
