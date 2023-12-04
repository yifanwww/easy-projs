import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import { useForceUpdate } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import { assert } from '@easy-pkg/utils-browser';
import { createContext, useCallback, useMemo, useRef } from 'react';

import { reduce } from './reducer';
import type { ReducerAction } from './reducer';
import type { InspectionContextValue, InspectionUpdaterContextValue } from './types';

export function getInitialState(): InspectionContextValue {
    return {
        data: {},
        groups: [],
        selectedGroup: undefined,
    };
}

export const InspectionContext = createContext<InspectionContextValue>(getInitialState());

export const InspectionUpdaterContext = createContext<InspectionUpdaterContextValue>({
    addRecord: abstractFn,
    forceUpdate: abstractFn,
    registerGroup: abstractFn,
    toggleGroup: abstractFn,
});

export function InspectionProvider({ children }: ReactChildrenProps): React.ReactNode {
    const ref = useRef<InspectionContextValue>();
    if (!ref.current) {
        ref.current = getInitialState();
    }

    const forceUpdate = useForceUpdate();

    const dispatch = useCallback<React.Dispatch<ReducerAction>>((action) => {
        assert(typeof ref.current === 'object');
        ref.current = reduce(ref.current, action);
    }, []);

    const updaters = useMemo<InspectionUpdaterContextValue>(
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
        <InspectionUpdaterContext.Provider value={updaters}>
            <InspectionContext.Provider value={ref.current}>{children}</InspectionContext.Provider>
        </InspectionUpdaterContext.Provider>
    );
}
