import { useConst, useConstFn, useForceUpdate } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import produce from 'immer';
import { createContext, useRef } from 'react';
import { noop } from 'ts-essentials';

import { IInspectionData, IInspectionTree } from 'src/common/inspection';
import { useDoubleRenderSign } from 'src/hooks/useDoubleRenderSign';

export interface IInspectionContext {
    data: {
        [Group: string]: {
            records: IInspectionData[];
            tree: IInspectionTree;
        };
    };
    groups: string[];
    selectedGroup: Optional<string>;
}

export interface IInspectionContextUpdater {
    addRecord: (record: IInspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
    toggleGroup: (toggle: 'prev' | 'next') => void;
}

const initialContext: IInspectionContext = {
    data: {},
    groups: [],
    selectedGroup: null,
};

type IInspectionAction =
    | { type: 'add-record'; groupIndex: number; record: IInspectionData }
    | { type: 'register-group'; index: number; group: string }
    | { type: 'toggle-group'; toggle: 'prev' | 'next' };

const reduce = produce<ReactImmerReducer<IInspectionContext, IInspectionAction>>((state, action) => {
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

export const InspectionContext = createContext<IInspectionContext>(initialContext);

export const InspectionContextUpdater = createContext<IInspectionContextUpdater>({
    addRecord: noop,
    forceUpdate: noop,
    registerGroup: noop,
    toggleGroup: noop,
});

export const InspectionProvider: React.FC = (props) => {
    const ref = useRef(initialContext);

    const { sign } = useDoubleRenderSign();
    const forceUpdate = useForceUpdate();

    const dispatch = useConstFn<React.Dispatch<IInspectionAction>>((action) => {
        ref.current = reduce(ref.current, action);
    });

    const updaters = useConst<IInspectionContextUpdater>(() => ({
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
            <InspectionContext.Provider value={ref.current}>{props.children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
