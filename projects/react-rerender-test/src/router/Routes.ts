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
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
        exact: true,
    },
    {
        path: RoutePath.CHANGE_LEVEL,
        component: lazy(() => import(/* webpackChunkName: 'change-level' */ 'src/containers/ChangeLevelPage')),
        exact: true,
    },
    {
        path: RoutePath.CHANGE_PARENT,
        component: lazy(() => import(/* webpackChunkName: 'change-parent' */ 'src/containers/ChangeParentPage')),
        exact: true,
    },
    {
        path: RoutePath.NESTED_FC,
        component: lazy(() => import(/* webpackChunkName: 'nested' */ 'src/containers/NestedFCPage')),
        exact: true,
    },
    {
        path: RoutePath.RERENDER_PARENT,
        component: lazy(() => import(/* webpackChunkName: 'rerender-parent' */ 'src/containers/RerenderParentPage')),
        exact: true,
    },
    {
        path: RoutePath.ROUTE,
        component: lazy(() => import(/* webpackChunkName: 'route' */ 'src/containers/RouterPage')),
    },
]);
