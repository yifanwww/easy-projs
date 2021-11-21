import { NoHooks, UseCallback, UseMemo, UseReducer, UseRef, UseState } from './tests';

export interface ComponentInfo {
    component: React.FunctionComponent;
    key: string;
    name: string;
}

function transform(infos: ComponentInfo[]): Record<string, ComponentInfo> {
    const res: Record<string, ComponentInfo> = {};

    for (const info of infos) {
        res[info.key] = info;
    }

    return res;
}

export const componentInfos = transform([
    { component: NoHooks, key: 'NoHooks', name: 'No Hooks' },
    { component: UseMemo, key: 'UseMemo', name: 'useMemo' },
    { component: UseCallback, key: 'UseCallback', name: 'useCallback' },
    { component: UseRef, key: 'UseRef', name: 'useRef' },
    { component: UseState, key: 'UseState', name: 'useState' },
    { component: UseReducer, key: 'UseReducer', name: 'useReducer' },
]);
