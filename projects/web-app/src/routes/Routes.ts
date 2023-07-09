import { createRoutes } from '@easy-pkg/utils-react-router';
import type { RouteConfig } from '@easy-pkg/utils-react-router';
import { lazy } from 'react';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/pages/HomePage')),
    },

    // -------------------- React Rerender Test --------------------

    {
        path: RoutePath.RERENDER_TEST_HOME,
        component: lazy(() => import(/* webpackChunkName: 'rerender-test-home' */ 'src/pages/RerenderTest/HomePage')),
    },
    {
        path: RoutePath.RERENDER_TEST_CHANGE_LEVEL,
        component: lazy(
            () => import(/* webpackChunkName: 'rerender-test-change-level' */ 'src/pages/RerenderTest/ChangeLevelPage'),
        ),
    },
    {
        path: RoutePath.RERENDER_TEST_CHANGE_PARENT,
        component: lazy(
            () =>
                import(/* webpackChunkName: 'rerender-test-change-parent' */ 'src/pages/RerenderTest/ChangeParentPage'),
        ),
    },
    {
        path: RoutePath.RERENDER_TEST_NESTED_FC,
        component: lazy(
            () => import(/* webpackChunkName: 'rerender-test-nested' */ 'src/pages/RerenderTest/NestedFCPage'),
        ),
    },
    {
        path: RoutePath.RERENDER_TEST_RERENDER_PARENT,
        component: lazy(
            () =>
                import(
                    /* webpackChunkName: 'rerender-test-rerender-parent' */ 'src/pages/RerenderTest/RerenderParentPage'
                ),
        ),
    },
    {
        path: RoutePath.RERENDER_TEST_ROUTE,
        component: lazy(
            () => import(/* webpackChunkName: 'rerender-test-route' */ 'src/pages/RerenderTest/RouterPage'),
        ),
        exact: false,
    },

    // -------------------- React Performance Test --------------------

    {
        path: RoutePath.PERF_TEST_HOME,
        component: lazy(() => import(/* webpackChunkName: 'perf-test-home' */ 'src/pages/PerfTest/HomePage')),
    },
    {
        path: RoutePath.PERF_TEST_TEST,
        component: lazy(() => import(/* webpackChunkName: 'perf-test-test' */ 'src/pages/PerfTest/TestPage')),
    },
    {
        path: RoutePath.PERF_TEST_BAR_CHART,
        component: lazy(
            () => import(/* webpackChunkName: 'perf-test-bar-chart' */ 'src/pages/PerfTest/ChartPage/BarChartPage'),
        ),
    },
    {
        path: RoutePath.PERF_TEST_LINE_CHART,
        component: lazy(
            () => import(/* webpackChunkName: 'perf-test-line-chart' */ 'src/pages/PerfTest/ChartPage/LineChartPage'),
        ),
    },
]);
