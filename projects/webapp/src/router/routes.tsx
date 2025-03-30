import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import { RoutePath } from './path';

export const routes: RouteObject[] = [
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
