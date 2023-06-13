import { useForceUpdate } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import { createContext, useCallback, useMemo, useRef } from 'react';

import { useDoubleRenderSign } from 'src/hooks/useDoubleRenderSign';

import { reduce } from './reducer';
import type { ReducerAction } from './reducer';
import type { InspectionContextState, InspectionContextUpdaters } from './types';

export const initialState: InspectionContextState = {
    data: {},
    groups: [],
    selectedGroup: null,
};

export const InspectionContext = createContext<InspectionContextState>(initialState);

export const InspectionContextUpdater = createContext<InspectionContextUpdaters>({
    addRecord: abstractFn,
    forceUpdate: abstractFn,
    registerGroup: abstractFn,
    toggleGroup: abstractFn,
});

export const InspectionProvider: React.FC = ({ children }) => {
    const ref = useRef(initialState);

    const { sign } = useDoubleRenderSign();
    const forceUpdate = useForceUpdate();

    const dispatch = useCallback<React.Dispatch<ReducerAction>>((action) => {
        ref.current = reduce(ref.current, action);
    }, []);

    const updaters = useMemo<InspectionContextUpdaters>(
        () => ({
            addRecord: (record, groupIndex) => {
                if (sign(record)) {
                    dispatch({ type: 'add-record', groupIndex, record });
                }
            },
            forceUpdate,
            registerGroup: (group, index) => dispatch({ type: 'register-group', group, index }),
            toggleGroup: (toggle) => {
                dispatch({ type: 'toggle-group', toggle });
                forceUpdate();
            },
        }),
        [dispatch, forceUpdate, sign],
    );

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={ref.current}>{children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
