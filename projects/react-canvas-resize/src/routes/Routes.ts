import { createRoutes } from '@easy-pkg/utils-react-router';
import type { RouteConfig } from '@easy-pkg/utils-react-router';
import { lazy } from 'react';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
    },
]);
