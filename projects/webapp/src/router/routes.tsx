import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const reactRerenderTestRoutes: RouteObject = {
    path: 'react-rerender-test',
    children: [
        {
            index: true,
            lazy: async () => {
                const module = await import('../containers/RerenderTest/Home');
                return { element: <module.Home /> };
            },
        },
        {
            path: 'change-level',
            lazy: async () => {
                const module = await import('../containers/RerenderTest/ChangeLevel');
                return { element: <module.ChangeLevel /> };
            },
        },
        {
            path: 'change-parent',
            lazy: async () => {
                const module = await import('../containers/RerenderTest/ChangeParent');
                return { element: <module.ChangeParent /> };
            },
        },
        {
            path: 'nested-fc',
            lazy: async () => {
                const module = await import('../containers/RerenderTest/NestedFC');
                return { element: <module.NestedFC /> };
            },
        },
        {
            path: 'rerender-parent',
            lazy: async () => {
                const module = await import('../containers/RerenderTest/RerenderParent');
                return { element: <module.RerenderParent /> };
            },
        },
    ],
};

const reactPerfTestRoutes: RouteObject = {
    path: 'react-perf-test',
    children: [
        {
            index: true,
            lazy: async () => {
                const module = await import('../containers/PerfTest/Home');
                return { element: <module.Home /> };
            },
        },
        {
            path: 'test',
            lazy: async () => {
                const module = await import('../containers/PerfTest/Test');
                return { element: <module.Test /> };
            },
        },
        {
            path: 'bar-chart',
            lazy: async () => {
                const module = await import('../containers/PerfTest/Chart/BarChart');
                return { element: <module.BarChart /> };
            },
        },
        {
            path: 'line-chart',
            lazy: async () => {
                const module = await import('../containers/PerfTest/Chart/LineChart');
                return { element: <module.LineChart /> };
            },
        },
    ],
};

export const routes: RouteObject[] = [
    {
        path: '/',
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
        element: <Navigate to="/" replace />,
    },
];
