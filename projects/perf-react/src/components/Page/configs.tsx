import { BarChartOutlined, ExperimentOutlined, HomeOutlined, LineChartOutlined } from '@ant-design/icons';

import { RoutePath } from 'src/routes';

export interface SiderConfig {
    path: string;
    icon: React.ReactNode;
}

function createSiders(): SiderConfig[] {
    return [
        { path: RoutePath.HOME, icon: <HomeOutlined /> },
        { path: RoutePath.TEST, icon: <ExperimentOutlined /> },
        { path: RoutePath.BAR_CHART, icon: <BarChartOutlined /> },
        { path: RoutePath.LINE_CHART, icon: <LineChartOutlined /> },
    ];
}

export const siderConfigs: Record<string, SiderConfig[] | undefined> = {
    [RoutePath.BAR_CHART]: createSiders(),
    [RoutePath.LINE_CHART]: createSiders(),
    [RoutePath.TEST]: createSiders(),
};
