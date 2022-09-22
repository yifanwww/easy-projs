import { RoutePath } from 'src/router';

export interface SiderInfo {
    path: RoutePath;
    title: string;
}

export const siders: SiderInfo[] = [
    { path: RoutePath.HOME, title: 'Home' },
    { path: RoutePath.TEST, title: 'Test' },
    { path: RoutePath.BAR_CHART, title: 'Bar Chart' },
    { path: RoutePath.LINE_CHART, title: 'Line Chart' },
];
