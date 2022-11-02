import { useConst, useConstFn, useForceUpdate } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import type { ImmerReducer } from '@easy-pkg/utils-react';
import produce from 'immer';
import { createContext, useRef } from 'react';

import type { InspectionData } from 'src/common/inspection';
import { useDoubleRenderSign } from 'src/hooks/useDoubleRenderSign';

import type { InspectionContextState, InspectionContextUpdaters } from './types';

const initialState: InspectionContextState = {
    data: {},
    groups: [],
    selectedGroup: null,
};

type ReducerAction =
    | { type: 'add-record'; groupIndex: number; record: InspectionData }
    | { type: 'register-group'; index: number; group: string }
    | { type: 'toggle-group'; toggle: 'prev' | 'next' };

const reduce = produce<ImmerReducer<InspectionContextState, ReducerAction>>((state, action) => {
    let never: never;
    switch (action.type) {
        case 'add-record': {
            const { groupIndex, record } = action;
            const { data, groups } = state;

            data[groups[groupIndex]].records.push(record);

            break;
        }

        case 'register-group': {
            const { group, index } = action;
            const { data, groups } = state;

            if (data[group] === undefined) {
                groups.push(group);
                data[group] = {
                    records: [],
                    tree: { group, index, children: [] },
                };
            }

            if (groups.length > 0 && state.selectedGroup === null) {
                state.selectedGroup = groups[0];
            }

            break;
        }

        case 'toggle-group': {
            const { toggle } = action;
            const { groups } = state;

            if (!state.selectedGroup) break;

            const index = groups.indexOf(state.selectedGroup);
            if (toggle === 'next') {
                state.selectedGroup = groups[(index + 1) % groups.length];
            } else {
                state.selectedGroup = groups[(index + groups.length - 1) % groups.length];
            }

            break;
        }

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
});

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

    const dispatch = useConstFn<React.Dispatch<ReducerAction>>((action) => {
        ref.current = reduce(ref.current, action);
    });

    const updaters = useConst<InspectionContextUpdaters>(() => ({
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
    }));

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={ref.current}>{children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
