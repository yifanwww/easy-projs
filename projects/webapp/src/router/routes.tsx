import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import { RoutePath } from './path';

// -------------------- Component Demo Pages --------------------

const DemoRoutes: RouteObject[] = [
    {
        path: RoutePath.DEMO_ANTD_FORM_APPENDABLE_LIST,
        lazy: async () => {
            const { FormAppendableListDemo } = await import('../demos/rc-antd/FormAppendableListDemo');
            return { element: <FormAppendableListDemo /> };
        },
    },
    {
        path: RoutePath.DEMO_ANTD_FORM_APPENDABLE_TABLE,
        lazy: async () => {
            const { FormAppendableTableDemo } = await import('../demos/rc-antd/FormAppendableTableDemo');
            return { element: <FormAppendableTableDemo /> };
        },
    },
    {
        path: RoutePath.DEMO_ANTD_READONLYABLE,
        lazy: async () => {
            const { ReadonlyableDemo } = await import('../demos/rc-antd/ReadonlyableDemo');
            return { element: <ReadonlyableDemo /> };
        },
    },
];

const DemoRoute: RouteObject = {
    path: RoutePath.DEMO,
    lazy: async () => {
        const { ComponentDemoContainer } = await import('../demos/ComponentDemoContainer');
        return { element: <ComponentDemoContainer /> };
    },
    children: [
        {
            index: true,
            lazy: async () => {
                const { ComponentDemoOverview } = await import('../demos/ComponentDemoOverview');
                return { element: <ComponentDemoOverview /> };
            },
        },
        ...DemoRoutes,
        {
            path: `${RoutePath.DEMO}/*`,
            element: <Navigate to={RoutePath.DEMO} replace />,
        },
    ],
};

// -------------------- Route Entry --------------------

export const routes: RouteObject[] = [
    DemoRoute,
    {
        path: RoutePath.HOME,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { Home } = await import('../pages/Home');
                    return { element: <Home /> };
                },
            },
        ],
    },
    {
        path: `${RoutePath.HOME}*`,
        element: <Navigate to={RoutePath.HOME} replace />,
    },
];
