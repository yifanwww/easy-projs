import { RoutePath } from 'src/routes';

export interface SiderConfig {
    path: string;
    title: string;
    children?: SiderConfig[];
}

function createSider(): SiderConfig[] {
    return [
        { path: RoutePath.HOME, title: 'Home' },
        {
            path: RoutePath.RERENDER_TEST_HOME,
            title: 'Rerender Test',
            children: [
                { path: RoutePath.RERENDER_TEST_CHANGE_LEVEL, title: 'Change Level' },
                { path: RoutePath.RERENDER_TEST_CHANGE_PARENT, title: 'Change Parent' },
                { path: RoutePath.RERENDER_TEST_NESTED_FC, title: 'Nested FC' },
                { path: RoutePath.RERENDER_TEST_RERENDER_PARENT, title: 'Rerender Parent' },
                { path: RoutePath.RERENDER_TEST_ROUTE, title: 'Router' },
            ],
        },
    ];
}

export const siderConfigs: Record<string, SiderConfig[] | undefined> = {
    [RoutePath.HOME]: createSider(),

    [RoutePath.RERENDER_TEST_CHANGE_LEVEL]: createSider(),
    [RoutePath.RERENDER_TEST_CHANGE_PARENT]: createSider(),
    [RoutePath.RERENDER_TEST_HOME]: createSider(),
    [RoutePath.RERENDER_TEST_NESTED_FC]: createSider(),
    [RoutePath.RERENDER_TEST_RERENDER_PARENT]: createSider(),
    [RoutePath.RERENDER_TEST_ROUTE]: createSider(),
};
