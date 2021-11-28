import { useConst } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import { createContext } from 'react';
import { noop } from 'ts-essentials';
import { useImmerReducer } from 'use-immer';

import { BenchmarkResult, BenchmarkTypes } from 'src/common/benchmark';

import { benchmarkResultAdapter, benchmarkResultSelector } from './adapters';
import { IBenchmarkContext, IBenchmarkContextUpdaters } from './types';

const initialContext: IBenchmarkContext = {
    mount: {},
    unmount: {},
    update: {},
    totalResults: benchmarkResultAdapter.getInitialState(),
};

type IBenchmarkAction =
    | { type: 'add'; result: BenchmarkResult }
    | { type: 'clear'; benchmarkType: BenchmarkTypes; componentName: string }
    | { type: 'clear-all' };

const reducer: ReactImmerReducer<IBenchmarkContext, IBenchmarkAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'add': {
            const { result } = action;

            benchmarkResultAdapter.addOne(state.totalResults, result);
            if (state[result.type][result.name] === undefined) {
                state[result.type][result.name] = benchmarkResultAdapter.getInitialState();
            }
            benchmarkResultAdapter.addOne(state[result.type][result.name], result);

            break;
        }

        case 'clear': {
            const { benchmarkType, componentName } = action;

            const selectIds = benchmarkResultSelector.selectIds(state.totalResults).filter((id) => {
                const result = benchmarkResultSelector.selectById(state.totalResults, id)!;
                return result.name === componentName && result.type === benchmarkType;
            });

            benchmarkResultAdapter.removeMany(state.totalResults, selectIds);
            benchmarkResultAdapter.removeAll(state[benchmarkType][componentName]);

            break;
        }

        case 'clear-all':
            benchmarkResultAdapter.removeAll(state.totalResults);
            for (const name in state.mount) benchmarkResultAdapter.removeAll(state.mount[name]);
            for (const name in state.unmount) benchmarkResultAdapter.removeAll(state.unmount[name]);
            for (const name in state.update) benchmarkResultAdapter.removeAll(state.update[name]);
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
        clear: (benchmarkType, componentName) => dispatch({ type: 'clear', benchmarkType, componentName }),
        clearAll: () => dispatch({ type: 'clear-all' }),
    }));

    return (
        <BenchmarkContextUpdater.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{props.children}</BenchmarkContext.Provider>
        </BenchmarkContextUpdater.Provider>
    );
};
