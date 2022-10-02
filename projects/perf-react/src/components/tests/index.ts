import type { ComponentName } from 'src/common/benchmark';

import { NoHooks, UseCallback, UseMemo, UseReducer, UseRef, UseState } from './tests';

export interface ComponentInfo {
    component: React.FunctionComponent;
    name: ComponentName;
    displayName: string;
}

function transform(infos: ComponentInfo[]): Record<ComponentName, ComponentInfo> {
    const res: Record<string, ComponentInfo> = {};
    for (const info of infos) res[info.name] = info;
    return res;
}

export const componentInfos = transform([
    { component: NoHooks, name: 'noHooks', displayName: 'No Hooks' },
    { component: UseMemo, name: 'useMemo', displayName: 'useMemo' },
    { component: UseCallback, name: 'useCallback', displayName: 'useCallback' },
    { component: UseRef, name: 'useRef', displayName: 'useRef' },
    { component: UseState, name: 'useState', displayName: 'useState' },
    { component: UseReducer, name: 'useReducer', displayName: 'useReducer' },
]);

export const componentNames = Object.keys(componentInfos) as ComponentName[];
