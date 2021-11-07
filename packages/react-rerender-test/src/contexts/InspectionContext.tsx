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
}

export interface IInspectionContextUpdater {
    addRecord: (record: IInspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
}

const initialContext: IInspectionContext = {
    data: {},
    groups: [],
};

type IInspectionAction =
    | { type: 'add-record'; groupIndex: number; record: IInspectionData }
    | { type: 'register-group'; index: number; group: string };

const reduce = produce<ReactImmerReducer<IInspectionContext, IInspectionAction>>((state, action) => {
    let never: never;
    switch (action.type) {
        case 'add-record': {
            const { groupIndex, record } = action;
            state.data[state.groups[groupIndex]].records.push(record);
            break;
        }

        case 'register-group': {
            const { group, index } = action;
            if (state.data[group] === undefined) {
                state.groups.push(group);
                state.data[group] = {
                    records: [],
                    tree: { group, index, children: [] },
                };
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
    }));

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={ref.current}>{props.children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
