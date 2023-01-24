import type { Draft } from 'immer';
import type { ImmerReducer } from 'use-immer';

import type { BenchmarkResult, BenchmarkTypes, ComponentName } from 'src/common/benchmark';

import { benchmarkResultAdapter, benchmarkResultSelector } from './adapters';
import type { BenchmarkContextState, GroupBenchmarkResults } from './types';

function calculateAverageStats(state: Draft<BenchmarkContextState>): void {
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

type ReducerAction =
    | { type: 'add'; result: BenchmarkResult }
    | { type: 'clear'; benchmarkType: BenchmarkTypes; componentName: ComponentName }
    | { type: 'clear-all' };

export const reducer: ImmerReducer<BenchmarkContextState, ReducerAction> = (state, action) => {
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
