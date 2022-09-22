import { RoutePath } from 'src/router';

export interface SiderInfo {
    path: RoutePath;
    title: string;
}

export const siders: SiderInfo[] = [
    { path: RoutePath.HOME, title: 'Home' },
    { path: RoutePath.CHANGE_LEVEL, title: 'Change Level' },
    { path: RoutePath.CHANGE_PARENT, title: 'Change Parent' },
    { path: RoutePath.NESTED_FC, title: 'Nested FC' },
    { path: RoutePath.RERENDER_PARENT, title: 'Rerender Parent' },
    { path: RoutePath.ROUTE, title: 'Router' },
];
