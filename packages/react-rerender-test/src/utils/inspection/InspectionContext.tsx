import { useConst, useConstFn, useForceUpdate } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import _produce from 'immer';
import { createContext, useRef } from 'react';
import { noop } from 'ts-essentials';

import { IInspectionData } from 'src/utils/inspection';

export interface IInspectionContext {
    records: IInspectionData[];
}

export interface IInspectionContextUpdater {
    addRecord: (record: IInspectionData) => void;
    forceUpdate: () => void;
}

const initialContext: IInspectionContext = {
    records: [],
};

type IInspectionAction = { type: 'addRecord'; record: IInspectionData };

const reducer: ReactImmerReducer<IInspectionContext, IInspectionAction> = (state, action) => {
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

function useDoubleRenderSign() {
    const dbRef = useRef<Record<string, boolean>>({});

    const sign = useConstFn((record: IInspectionData): boolean => {
        const key = JSON.stringify(record);

        if (dbRef.current[key] === undefined) {
            dbRef.current[key] = false;
        } else {
            dbRef.current[key] = !dbRef.current[key];
        }

        return dbRef.current[key];
    });

    return { sign };
}

export const InspectionProvider: React.FC = (props) => {
    const context = useRef(initialContext);

    // As `StrictMode` is set, use this hook to check double-render in development mode.
    const { sign } = useDoubleRenderSign();

    const forceUpdate = useForceUpdate();

    const dispatch = useConstFn((action: IInspectionAction) => {
        context.current = produce(context.current, action);
    });

    const updaters = useConst<IInspectionContextUpdater>(() => ({
        addRecord: (record) => {
            let signRes = true;

            // Check double-render in development mode.
            if (process.env.NODE_ENV === 'development') {
                signRes = sign(record);
            }

            if (signRes) {
                dispatch({ type: 'addRecord', record });
            }
        },
        forceUpdate,
    }));

    return (
        <InspectionContextUpdater.Provider value={updaters}>
            <InspectionContext.Provider value={context.current}>{props.children}</InspectionContext.Provider>
        </InspectionContextUpdater.Provider>
    );
};
