import { useForceUpdate } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import { assert } from '@easy-pkg/utils-browser';
import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { createContext, useCallback, useMemo, useRef } from 'react';

import { reduce } from './reducer';
import type { ReducerAction } from './reducer';
import type { InspectionContextState, InspectionContextUpdaters } from './types';

export function getInitialState(): InspectionContextState {
    return {
        data: {},
        groups: [],
        selectedGroup: undefined,
    };
}

export const InspectionContext = createContext<InspectionContextState>(getInitialState());

export const InspectionContextUpdater = createContext<InspectionContextUpdaters>({
    addRecord: abstractFn,
    forceUpdate: abstractFn,
    registerGroup: abstractFn,
    toggleGroup: abstractFn,
});

export function InspectionProvider({ children }: ReactChildrenProps): JSX.Element {
    const ref = useRef<InspectionContextState>();
    if (!ref.current) {
        ref.current = getInitialState();
    }

    const forceUpdate = useForceUpdate();

    const dispatch = useCallback<React.Dispatch<ReducerAction>>((action) => {
        assert(typeof ref.current === 'object');
        ref.current = reduce(ref.current, action);
    }, []);

    const updaters = useMemo<InspectionContextUpdaters>(
        () => ({
            addRecord: (record, groupIndex) => {
                dispatch({ type: 'add-record', groupIndex, record });
            },
            forceUpdate,
            registerGroup: (group, index) => dispatch({ type: 'register-group', group, index }),
            toggleGroup: (toggle) => {
                dispatch({ type: 'toggle-group', toggle });
                forceUpdate();
            },
        }),
        [dispatch, forceUpdate],
    );

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={ref.current}>{children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
}
