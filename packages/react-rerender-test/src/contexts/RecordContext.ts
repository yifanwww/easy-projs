import { noop } from 'ts-essentials';

import { contextFactory, ContextReducer } from './contextFactory';

export interface IRecord {
    name: string;
    reason?: string;
}

export interface IRecordContext {
    records: IRecord[];
}

export interface IRecordContextUpdater {
    addRecord: (record: IRecord) => void;
}

type IReducerAction = { type: 'addRecord'; record: IRecord };

const reducer: ContextReducer<IRecordContext, IReducerAction> = (state, action) => {
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

export const {
    Context: RecordContext,
    ContextUpdater: RecordContextUpdater,
    Provider: RecordProvider,
} = contextFactory<IRecordContext, IRecordContextUpdater, IReducerAction>(
    'Record',
    { records: [] },
    { addRecord: noop },
    reducer,
    (dispatch) => ({
        addRecord: (record) => dispatch({ type: 'addRecord', record }),
    }),
);
