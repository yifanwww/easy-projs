import { RoutePath } from 'src/router';

export interface SiderInfo {
    path: RoutePath;
    title: string;
}

export const siders: SiderInfo[] = [
    { path: RoutePath.HomePage, title: 'Home' },
    { path: RoutePath.ChangeLevelPage, title: 'Change Level' },
    { path: RoutePath.ChangeParentPage, title: 'Change Parent' },
    { path: RoutePath.NestedFCPage, title: 'Nested FC' },
    { path: RoutePath.RerenderParentPage, title: 'Rerender Parent' },
    { path: RoutePath.RoutePage, title: 'Router' },
];
