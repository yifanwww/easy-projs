export enum RoutePath {
    HomePage = '/home',

    ChangeLevelPage = '/change-level',
    ChangeParentPage = '/change-parent',
    NestedFCPage = '/nested-fc',
    RerenderParentPage = '/rerender-parent',
    RoutePage = '/router',
    RoutePageDetail = '/router/:num',
}

export interface IRouteInfo {
    component: React.ComponentType;
    exact?: boolean;
    path: RoutePath;
    sider: string;
}

export type IPartialRouteInfos = {
    [Path in RoutePath]?: Omit<IRouteInfo, 'path'>;
};

export type IRouteInfos = {
    [Path in RoutePath]?: IRouteInfo;
};

export function genRouteInfos(routes: IPartialRouteInfos): IRouteInfos {
    for (const path of Object.keys(routes) as RoutePath[]) {
        (routes as IRouteInfos)[path]!.path = path;
    }
    return routes as IRouteInfos;
}
