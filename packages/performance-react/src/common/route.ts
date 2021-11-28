export enum RoutePath {
    BarChartPage = '/bar-chart',
    LineChartPage = '/line-chart',
    HomePage = '/home',
    TestPage = '/test',
}

export interface IRouteInfo {
    component: React.ComponentType;
    deepMatch?: boolean;
    path: RoutePath;
    sider: string;
}

export type IRouteInfos = {
    [Path in RoutePath]?: IRouteInfo;
};

export function genRouteInfos(routes: IRouteInfo[]): IRouteInfos {
    const infos: IRouteInfos = {};
    for (const route of routes) {
        infos[route.path] = route;
    }
    return infos;
}
