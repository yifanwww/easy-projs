export enum RoutePath {
    HomePage = '/home',
    NestedFCPage = '/nested-fc',
    PrcChangeLevelPage = '/prc/change-level',
    PrcChangeParentPage = '/prc/change-parent',
    PrcRerenderParentPage = '/prc/rerender-parent',
    PrcRoutePage = '/prc/router',
    PrcRoutePageDetail = '/prc/router/:num',
    PtcChangeLevelPage = '/ptc/change-level',
    PtcChangeParentPage = '/ptc/change-parent',
    PtcRerenderParentPage = '/ptc/rerender-parent',
    PtcRoutePage = '/ptc/router',
    PtcRoutePageDetail = '/ptc/router/:num',
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
