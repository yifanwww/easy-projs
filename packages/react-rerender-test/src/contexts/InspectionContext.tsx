import { useConst, useConstFn, useForceUpdate } from '@easy/hooks';
import _produce from 'immer';
import { createContext, useRef } from 'react';
import { noop } from 'ts-essentials';

import { IInspectionRecord } from 'src/common/inspection';

import { ContextReducer } from './types';

export interface IInspectionContext {
    records: IInspectionRecord[];
}

export interface IInspectionContextUpdater {
    addRecord: (record: IInspectionRecord) => void;
    forceUpdate: () => void;
}

const initialContext: IInspectionContext = {
    records: [],
};

type IReducerAction = { type: 'addRecord'; record: IInspectionRecord };

const reducer: ContextReducer<IInspectionContext, IReducerAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'addRecord':
            state.records.push(action.record);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action.type;
            break;
    }
};
const produce = _produce(reducer);

export const InspectionContext = createContext<IInspectionContext>(initialContext);

export const InspectionContextUpdater = createContext<IInspectionContextUpdater>({
    addRecord: noop,
    forceUpdate: noop,
});

export const InspectionProvider: React.FC = (props) => {
    const context = useRef(initialContext);

    const forceUpdate = useForceUpdate();

    const dispatch = useConstFn((action: IReducerAction) => {
        context.current = produce(context.current, action);
    });

    const updaters = useConst<IInspectionContextUpdater>(() => ({
        addRecord: (record) => dispatch({ type: 'addRecord', record }),
        forceUpdate,
    }));

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={context.current}>{props.children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
