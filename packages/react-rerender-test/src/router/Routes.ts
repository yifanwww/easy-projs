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
        path: RoutePath.HomePage,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
        exact: true,
    },
    {
        path: RoutePath.ChangeLevelPage,
        component: lazy(() => import(/* webpackChunkName: 'change-level' */ 'src/containers/ChangeLevelPage')),
        exact: true,
    },
    {
        path: RoutePath.ChangeParentPage,
        component: lazy(() => import(/* webpackChunkName: 'change-parent' */ 'src/containers/ChangeParentPage')),
        exact: true,
    },
    {
        path: RoutePath.NestedFCPage,
        component: lazy(() => import(/* webpackChunkName: 'nested' */ 'src/containers/NestedFCPage')),
        exact: true,
    },
    {
        path: RoutePath.RerenderParentPage,
        component: lazy(() => import(/* webpackChunkName: 'rerender-parent' */ 'src/containers/RerenderParentPage')),
        exact: true,
    },
    {
        path: RoutePath.RoutePage,
        component: lazy(() => import(/* webpackChunkName: 'route' */ 'src/containers/RouterPage')),
    },
]);
