import { useConst } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import { createContext } from 'react';
import { noop } from 'ts-essentials';

import { BenchmarkResult, BenchmarkTypes, genBenchmarkResultName } from 'src/common/benchmark';
import { useImmerReducer } from 'use-immer';

export interface IBenchmarkContext {
    groups: Record<string, BenchmarkResult[] | undefined>;
    results: BenchmarkResult[];
}

export interface IBenchmarkContextUpdaters {
    add: (record: BenchmarkResult) => void;
    clear: (benchmarkType?: BenchmarkTypes, componentKey?: string) => void;
    clearAll: () => void;
}

const initialContext: IBenchmarkContext = { results: [], groups: {} };

type IBenchmarkAction =
    | { type: 'add'; result: BenchmarkResult }
    | { type: 'clear'; benchmarkType?: BenchmarkTypes; componentKey?: string }
    | { type: 'clear-all' };

const reducer: ReactImmerReducer<IBenchmarkContext, IBenchmarkAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'add': {
            const { result } = action;

            state.results.unshift(result);

            if (state.groups[result.name] === undefined) {
                state.groups[result.name] = [];
            }
            state.groups[result.name]!.push(result);

            break;
        }

        case 'clear': {
            state.results = [];

            const { benchmarkType, componentKey } = action;

            if (benchmarkType && componentKey) {
                state.groups[genBenchmarkResultName(benchmarkType, componentKey)] = [];
            }

            break;
        }

        case 'clear-all':
            for (const name in state.groups) state.groups[name] = [];
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
};

export const BenchmarkContext = createContext<IBenchmarkContext>(initialContext);

export const BenchmarkContextUpdater = createContext<IBenchmarkContextUpdaters>({
    add: noop,
    clear: noop,
    clearAll: noop,
});

export const BenchmarkProvider: React.FC = (props) => {
    const [context, dispatch] = useImmerReducer(reducer, initialContext);

    const updaters = useConst<IBenchmarkContextUpdaters>(() => ({
        add: (result) => dispatch({ type: 'add', result }),
        clear: (benchmarkType, componentKey) => dispatch({ type: 'clear', benchmarkType, componentKey }),
        clearAll: () => dispatch({ type: 'clear-all' }),
    }));

    return (
        <BenchmarkContextUpdater.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{props.children}</BenchmarkContext.Provider>
        </BenchmarkContextUpdater.Provider>
    );
};
