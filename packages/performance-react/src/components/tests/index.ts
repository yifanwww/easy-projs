import { ComponentName } from 'src/common/component';

import { NoHooks, UseCallback, UseMemo, UseReducer, UseRef, UseState } from './tests';

export interface ComponentInfo {
    component: React.FunctionComponent;
    name: ComponentName;
    displayName: string;
}

function transform(infos: ComponentInfo[]): Record<ComponentName, ComponentInfo> {
    const res: Record<ComponentName, ComponentInfo> = {};
    for (const info of infos) res[info.name] = info;
    return res;
}

export const componentInfos = transform([
    { component: NoHooks, name: 'NoHooks', displayName: 'No Hooks' },
    { component: UseMemo, name: 'UseMemo', displayName: 'useMemo' },
    { component: UseCallback, name: 'UseCallback', displayName: 'useCallback' },
    { component: UseRef, name: 'UseRef', displayName: 'useRef' },
    { component: UseState, name: 'UseState', displayName: 'useState' },
    { component: UseReducer, name: 'UseReducer', displayName: 'useReducer' },
]);
