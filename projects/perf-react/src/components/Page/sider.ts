import { RoutePath } from 'src/routes';

export interface SiderInfo {
    path: string;
    title: string;
}

export const siders: SiderInfo[] = [
    { path: RoutePath.HOME, title: 'Home' },
    { path: RoutePath.TEST, title: 'Test' },
    { path: RoutePath.BAR_CHART, title: 'Bar Chart' },
    { path: RoutePath.LINE_CHART, title: 'Line Chart' },
];
