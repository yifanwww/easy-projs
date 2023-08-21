import { BarChartOutlined, ExperimentOutlined, LineChartOutlined } from '@ant-design/icons';

import { RoutePath } from 'src/routes/path';

export interface SiderConfig {
    path: string;
    title: string;
    icon?: React.ReactNode;
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
        {
            path: RoutePath.PERF_TEST_HOME,
            title: 'Performance Test',
            children: [
                { path: RoutePath.PERF_TEST_TEST, title: 'Test', icon: <ExperimentOutlined /> },
                { path: RoutePath.PERF_TEST_BAR_CHART, title: 'Test', icon: <BarChartOutlined /> },
                { path: RoutePath.PERF_TEST_LINE_CHART, title: 'Test', icon: <LineChartOutlined /> },
            ],
        },
    ];
}

export const siderConfigs: Record<string, SiderConfig[] | undefined> = {
    [RoutePath.HOME]: createSider(),

    // -------------------- React Rerender Test --------------------

    [RoutePath.RERENDER_TEST_CHANGE_LEVEL]: createSider(),
    [RoutePath.RERENDER_TEST_CHANGE_PARENT]: createSider(),
    [RoutePath.RERENDER_TEST_HOME]: createSider(),
    [RoutePath.RERENDER_TEST_NESTED_FC]: createSider(),
    [RoutePath.RERENDER_TEST_RERENDER_PARENT]: createSider(),
    [RoutePath.RERENDER_TEST_ROUTE]: createSider(),

    // -------------------- React Performance Test --------------------

    [RoutePath.PERF_TEST_BAR_CHART]: createSider(),
    [RoutePath.PERF_TEST_HOME]: createSider(),
    [RoutePath.PERF_TEST_LINE_CHART]: createSider(),
    [RoutePath.PERF_TEST_TEST]: createSider(),
};
