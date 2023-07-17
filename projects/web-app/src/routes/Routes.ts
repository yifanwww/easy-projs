import { createRoutes } from '@easy-pkg/utils-react-router';
import type { RouteConfig } from '@easy-pkg/utils-react-router';
import { lazy } from 'react';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import('src/pages/HomePage')),
    },

    // -------------------- React Rerender Test --------------------

    {
        path: RoutePath.RERENDER_TEST_HOME,
        component: lazy(() => import('src/pages/RerenderTest/HomePage')),
    },
    {
        path: RoutePath.RERENDER_TEST_CHANGE_LEVEL,
        component: lazy(() => import('src/pages/RerenderTest/ChangeLevelPage')),
    },
    {
        path: RoutePath.RERENDER_TEST_CHANGE_PARENT,
        component: lazy(() => import('src/pages/RerenderTest/ChangeParentPage')),
    },
    {
        path: RoutePath.RERENDER_TEST_NESTED_FC,
        component: lazy(() => import('src/pages/RerenderTest/NestedFCPage')),
    },
    {
        path: RoutePath.RERENDER_TEST_RERENDER_PARENT,
        component: lazy(() => import('src/pages/RerenderTest/RerenderParentPage')),
    },
    {
        path: RoutePath.RERENDER_TEST_ROUTE,
        component: lazy(() => import('src/pages/RerenderTest/RouterPage')),
        exact: false,
    },

    // -------------------- React Performance Test --------------------

    {
        path: RoutePath.PERF_TEST_HOME,
        component: lazy(() => import('src/pages/PerfTest/HomePage')),
    },
    {
        path: RoutePath.PERF_TEST_TEST,
        component: lazy(() => import('src/pages/PerfTest/TestPage')),
    },
    {
        path: RoutePath.PERF_TEST_BAR_CHART,
        component: lazy(() => import('src/pages/PerfTest/ChartPage/BarChartPage')),
    },
    {
        path: RoutePath.PERF_TEST_LINE_CHART,
        component: lazy(() => import('src/pages/PerfTest/ChartPage/LineChartPage')),
    },
]);
