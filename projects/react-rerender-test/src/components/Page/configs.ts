import { RoutePath } from 'src/routes';

export interface SiderConfig {
    path: string;
    title: string;
}

function createSiders(): SiderConfig[] {
    return [
        { path: RoutePath.HOME, title: 'Home' },
        { path: RoutePath.CHANGE_LEVEL, title: 'Change Level' },
        { path: RoutePath.CHANGE_PARENT, title: 'Change Parent' },
        { path: RoutePath.NESTED_FC, title: 'Nested FC' },
        { path: RoutePath.RERENDER_PARENT, title: 'Rerender Parent' },
        { path: RoutePath.ROUTE, title: 'Router' },
    ];
}

export const siderConfigs: Record<string, SiderConfig[] | undefined> = {
    [RoutePath.CHANGE_LEVEL]: createSiders(),
    [RoutePath.CHANGE_PARENT]: createSiders(),
    [RoutePath.NESTED_FC]: createSiders(),
    [RoutePath.RERENDER_PARENT]: createSiders(),
    [RoutePath.ROUTE]: createSiders(),
};
