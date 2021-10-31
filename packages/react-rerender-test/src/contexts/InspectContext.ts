import { noop } from 'ts-essentials';

import { contextFactory, ContextReducer } from './contextFactory';

export interface IRecord {
    name: string;
    reason?: string;
}

export interface IInspectContext {
    forceUpdateNumber: Integer;
    records: IRecord[];
}

export interface IInspectContextUpdater {
    addRecord: (record: IRecord) => void;
    forceUpdate: () => void;
}

const initialContext: IInspectContext = {
    forceUpdateNumber: 0,
    records: [],
};

const initialUpdaters: IInspectContextUpdater = {
    addRecord: noop,
    forceUpdate: noop,
};

type IReducerAction = { type: 'addRecord'; record: IRecord } | { type: 'foceUpdate' };

const reducer: ContextReducer<IInspectContext, IReducerAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'addRecord':
            state.records.push(action.record);
            break;

        case 'foceUpdate':
            state.forceUpdateNumber++;
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
            break;
    }
};

export const {
    Context: InspectContext,
    ContextUpdater: InspectContextUpdater,
    Provider: InspectProvider,
} = contextFactory<IInspectContext, IInspectContextUpdater, IReducerAction>(
    'Record',
    initialContext,
    initialUpdaters,
    reducer,
    (dispatch) => ({
        addRecord: (record) => dispatch({ type: 'addRecord', record }),
        forceUpdate: () => dispatch({ type: 'foceUpdate' }),
    }),
);
