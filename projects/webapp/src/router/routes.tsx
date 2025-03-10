import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

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
