import { RoutePath } from 'src/router';

export interface SiderInfo {
    path: RoutePath;
    title: string;
}

export const siders: SiderInfo[] = [
    { path: RoutePath.HomePage, title: 'Home' },
    { path: RoutePath.TestPage, title: 'Test' },
    { path: RoutePath.BarChartPage, title: 'Bar Chart' },
    { path: RoutePath.LineChartPage, title: 'Line Chart' },
];
