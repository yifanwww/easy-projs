import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { RoutePath } from './path';

// -------------------- Components Intro Pages --------------------

const IntroRoute: RouteObject = {
    path: RoutePath.INTRO,
    lazy: async () => {
        const { IntroContainer } = await import('../intro/IntroContainer');
        return { element: <IntroContainer /> };
    },
    children: [
        {
            index: true,
            lazy: async () => {
                const { IntroOverview } = await import('../intro/IntroOverview');
                return { element: <IntroOverview /> };
            },
        },
        {
            path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST,
            lazy: async () => {
                const { FormAppendableListIntro } = await import('../intro/rc-antd/FormAppendableListIntro');
                return { element: <FormAppendableListIntro /> };
            },
        },
        {
            path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE,
            lazy: async () => {
                const { FormAppendableTableIntro } = await import('../intro/rc-antd/FormAppendableTableIntro');
                return { element: <FormAppendableTableIntro /> };
            },
        },
        {
            path: RoutePath.INTRO_ANTD_READONLYABLE,
            lazy: async () => {
                const { ReadonlyableIntro } = await import('../intro/rc-antd/ReadonlyableIntro');
                return { element: <ReadonlyableIntro /> };
            },
        },
        {
            path: `${RoutePath.INTRO}/*`,
            element: <Navigate to={RoutePath.INTRO} replace />,
        },
    ],
};

// -------------------- Route Entry --------------------

export const routes: RouteObject[] = [
    IntroRoute,
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
