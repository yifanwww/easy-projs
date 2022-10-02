import { useConst } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import { useImmerReducer } from '@easy-pkg/utils-react';
import type { ImmerReducer } from '@easy-pkg/utils-react';
import type { Draft } from 'immer';
import { createContext } from 'react';

import type { BenchmarkResult, BenchmarkTypes, ComponentName } from 'src/common/benchmark';

import { benchmarkResultAdapter, benchmarkResultSelector } from './adapters';
import type { GroupBenchmarkResults, IBenchmarkContext, IBenchmarkContextUpdaters } from './types';

const initialContext: IBenchmarkContext = {
    mount: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    unmount: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    update: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    totalResults: benchmarkResultAdapter.getInitialState(),
};

function calculateAverageStats(state: Draft<IBenchmarkContext>): void {
    function _calculate(group: GroupBenchmarkResults, name: ComponentName): void {
        const total = benchmarkResultSelector.selectAll(group[name]).reduce((prev, curr) => prev + curr.stats.mean, 0);
        group.average[name] = total / benchmarkResultSelector.selectTotal(group[name]);
    }

    _calculate(state.mount, 'noHooks');
    _calculate(state.mount, 'useCallback');
    _calculate(state.mount, 'useMemo');
    _calculate(state.mount, 'useReducer');
    _calculate(state.mount, 'useRef');
    _calculate(state.mount, 'useState');

    _calculate(state.unmount, 'noHooks');
    _calculate(state.unmount, 'useCallback');
    _calculate(state.unmount, 'useMemo');
    _calculate(state.unmount, 'useReducer');
    _calculate(state.unmount, 'useRef');
    _calculate(state.unmount, 'useState');

    _calculate(state.update, 'noHooks');
    _calculate(state.update, 'useCallback');
    _calculate(state.update, 'useMemo');
    _calculate(state.update, 'useReducer');
    _calculate(state.update, 'useRef');
    _calculate(state.update, 'useState');
}

type IBenchmarkAction =
    | { type: 'add'; result: BenchmarkResult }
    | { type: 'clear'; benchmarkType: BenchmarkTypes; componentName: ComponentName }
    | { type: 'clear-all' };

const reducer: ImmerReducer<IBenchmarkContext, IBenchmarkAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'add': {
            const { result } = action;

            benchmarkResultAdapter.addOne(state.totalResults, result);
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
            for (const name in state.mount) benchmarkResultAdapter.removeAll(state.mount[name as ComponentName]);
            for (const name in state.unmount) benchmarkResultAdapter.removeAll(state.unmount[name as ComponentName]);
            for (const name in state.update) benchmarkResultAdapter.removeAll(state.update[name as ComponentName]);
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }

    calculateAverageStats(state);
};

export const BenchmarkContext = createContext<IBenchmarkContext>(initialContext);

export const BenchmarkContextUpdater = createContext<IBenchmarkContextUpdaters>({
    add: abstractFn,
    clear: abstractFn,
    clearAll: abstractFn,
});

export const BenchmarkProvider: React.FC = ({ children }) => {
    const [context, dispatch] = useImmerReducer(reducer, initialContext);

    const updaters = useConst<IBenchmarkContextUpdaters>(() => ({
        add: (result) => dispatch({ type: 'add', result }),
        clear: (benchmarkType, componentName) => dispatch({ type: 'clear', benchmarkType, componentName }),
        clearAll: () => dispatch({ type: 'clear-all' }),
    }));

    return (
        <BenchmarkContextUpdater.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{children}</BenchmarkContext.Provider>
        </BenchmarkContextUpdater.Provider>
    );
};
