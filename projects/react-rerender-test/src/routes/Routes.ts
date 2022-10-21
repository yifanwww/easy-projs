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
        path: RoutePath.CHANGE_LEVEL,
        component: lazy(() => import(/* webpackChunkName: 'change-level' */ 'src/containers/ChangeLevelPage')),
    },
    {
        path: RoutePath.CHANGE_PARENT,
        component: lazy(() => import(/* webpackChunkName: 'change-parent' */ 'src/containers/ChangeParentPage')),
    },
    {
        path: RoutePath.NESTED_FC,
        component: lazy(() => import(/* webpackChunkName: 'nested' */ 'src/containers/NestedFCPage')),
    },
    {
        path: RoutePath.RERENDER_PARENT,
        component: lazy(() => import(/* webpackChunkName: 'rerender-parent' */ 'src/containers/RerenderParentPage')),
    },
    {
        path: RoutePath.ROUTE,
        component: lazy(() => import(/* webpackChunkName: 'route' */ 'src/containers/RouterPage')),
        exact: false,
    },
]);
