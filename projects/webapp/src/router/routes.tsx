import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { RoutePath } from './path';

const reactRerenderTestRoutes: RouteObject = {
    path: RoutePath.RERENDER_TEST_HOME,
    children: [
        {
            index: true,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/Home');
                return { element: <module.Home /> };
            },
        },
        {
            path: RoutePath.RERENDER_TEST_CHANGE_LEVEL,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/ChangeLevel');
                return { element: <module.ChangeLevel /> };
            },
        },
        {
            path: RoutePath.RERENDER_TEST_CHANGE_PARENT,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/ChangeParent');
                return { element: <module.ChangeParent /> };
            },
        },
        {
            path: RoutePath.RERENDER_TEST_NESTED_FC,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/NestedFC');
                return { element: <module.NestedFC /> };
            },
        },
        {
            path: RoutePath.RERENDER_TEST_RERENDER_PARENT,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/RerenderParent');
                return { element: <module.RerenderParent /> };
            },
        },
    ],
};

const reactPerfTestRoutes: RouteObject = {
    path: RoutePath.PERF_TEST_HOME,
    children: [
        {
            index: true,
            lazy: async () => {
                const module = await import('../containers/PerfTest/Home');
                return { element: <module.Home /> };
            },
        },
        {
            path: RoutePath.PERF_TEST_TEST,
            lazy: async () => {
                const module = await import('../containers/PerfTest/Test');
                return { element: <module.Test /> };
            },
        },
        {
            path: RoutePath.PERF_TEST_BAR_CHART,
            lazy: async () => {
                const module = await import('../containers/PerfTest/Chart/BarChart');
                return { element: <module.BarChart /> };
            },
        },
        {
            path: RoutePath.PERF_TEST_LINE_CHART,
            lazy: async () => {
                const module = await import('../containers/PerfTest/Chart/LineChart');
                return { element: <module.LineChart /> };
            },
        },
    ],
};

export const routes: RouteObject[] = [
    {
        path: RoutePath.HOME,
        lazy: async () => {
            const module = await import('../containers/ClientArea');
            return { element: <module.ClientArea /> };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    const module = await import('../containers/Home');
                    return { element: <module.Home /> };
                },
            },
            reactRerenderTestRoutes,
            reactPerfTestRoutes,
        ],
    },
    {
        path: '/*',
        element: <Navigate to={RoutePath.HOME} replace />,
    },
];
