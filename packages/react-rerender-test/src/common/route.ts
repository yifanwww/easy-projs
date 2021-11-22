export enum RoutePath {
    HomePage = '/home',

    ChangeLevelPage = '/change-level',
    ChangeParentPage = '/change-parent',
    NestedFCPage = '/nested-fc',
    RerenderParentPage = '/rerender-parent',
    RoutePage = '/router',
    RoutePageDetail = '/router/:num',
}

export interface RouteInfo {
    component: React.ComponentType;
    deepMatch?: boolean;
    path: RoutePath;
    sider: string;
}

export type RouteInfos = {
    [Path in RoutePath]?: RouteInfo;
};

export function genRouteInfos(routes: RouteInfo[]): RouteInfos {
    const infos: RouteInfos = {};
    for (const route of routes) {
        infos[route.path] = route;
    }
    return infos;
}
