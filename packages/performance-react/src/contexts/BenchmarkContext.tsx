import { useConst } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import { createContext } from 'react';
import { noop } from 'ts-essentials';

import { BenchmarkResult } from 'src/common/benchmark';
import { useImmerReducer } from 'use-immer';

export interface IBenchmarkContext {
    results: BenchmarkResult[];
}

export interface IBenchmarkContextUpdaters {
    add: (record: BenchmarkResult) => void;
    clear: () => void;
}

const initialContext: IBenchmarkContext = { results: [] };

type IBenchmarkAction = { type: 'add'; result: BenchmarkResult } | { type: 'clear' };

const reducer: ReactImmerReducer<IBenchmarkContext, IBenchmarkAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'add':
            state.results.unshift(action.result);
            break;

        case 'clear':
            state.results = [];
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
};

export const BenchmarkContext = createContext<IBenchmarkContext>(initialContext);

export const BenchmarkContextUpdater = createContext<IBenchmarkContextUpdaters>({ add: noop, clear: noop });

export const BenchmarkProvider: React.FC = (props) => {
    const [context, dispatch] = useImmerReducer(reducer, initialContext);

    const updaters = useConst<IBenchmarkContextUpdaters>(() => ({
        add: (result) => dispatch({ type: 'add', result }),
        clear: () => dispatch({ type: 'clear' }),
    }));

    return (
        <BenchmarkContextUpdater.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{props.children}</BenchmarkContext.Provider>
        </BenchmarkContextUpdater.Provider>
    );
};
