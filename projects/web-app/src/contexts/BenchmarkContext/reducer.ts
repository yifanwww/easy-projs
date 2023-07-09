import type { Draft } from 'immer';
import type { ImmerReducer } from 'use-immer';

import type { BenchmarkResult, BenchmarkTypes, ComponentName } from 'src/types/benchmark';

import { benchmarkResultAdapter, benchmarkResultSelector } from './adapters';
import type { BenchmarkContextState, GroupBenchmarkResults } from './types';

function calculateAverageStats(draft: Draft<BenchmarkContextState>): void {
    function _calculate(draftGroup: GroupBenchmarkResults, name: ComponentName): void {
        const total = benchmarkResultSelector
            .selectAll(draftGroup[name])
            .reduce((prev, curr) => prev + curr.stats.mean, 0);
        draftGroup.average[name] = total / benchmarkResultSelector.selectTotal(draftGroup[name]);
    }

    _calculate(draft.mount, 'noHooks');
    _calculate(draft.mount, 'useCallback');
    _calculate(draft.mount, 'useMemo');
    _calculate(draft.mount, 'useReducer');
    _calculate(draft.mount, 'useRef');
    _calculate(draft.mount, 'useState');

    _calculate(draft.unmount, 'noHooks');
    _calculate(draft.unmount, 'useCallback');
    _calculate(draft.unmount, 'useMemo');
    _calculate(draft.unmount, 'useReducer');
    _calculate(draft.unmount, 'useRef');
    _calculate(draft.unmount, 'useState');

    _calculate(draft.update, 'noHooks');
    _calculate(draft.update, 'useCallback');
    _calculate(draft.update, 'useMemo');
    _calculate(draft.update, 'useReducer');
    _calculate(draft.update, 'useRef');
    _calculate(draft.update, 'useState');
}

type ReducerAction =
    | { type: 'add'; result: BenchmarkResult }
    | { type: 'clear'; benchmarkType: BenchmarkTypes; componentName: ComponentName }
    | { type: 'clear-all' };

export const reducer: ImmerReducer<BenchmarkContextState, ReducerAction> = (draft, action) => {
    let never: never;
    switch (action.type) {
        case 'add': {
            const { result } = action;

            benchmarkResultAdapter.addOne(draft.totalResults, result);
            benchmarkResultAdapter.addOne(draft[result.type][result.name], result);

            break;
        }

        case 'clear': {
            const { benchmarkType, componentName } = action;

            const selectIds = benchmarkResultSelector.selectIds(draft.totalResults).filter((id) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const result = benchmarkResultSelector.selectById(draft.totalResults, id)!;
                return result.name === componentName && result.type === benchmarkType;
            });

            benchmarkResultAdapter.removeMany(draft.totalResults, selectIds);
            benchmarkResultAdapter.removeAll(draft[benchmarkType][componentName]);

            break;
        }

        case 'clear-all':
            benchmarkResultAdapter.removeAll(draft.totalResults);
            for (const name in draft.mount) benchmarkResultAdapter.removeAll(draft.mount[name as ComponentName]);
            for (const name in draft.unmount) benchmarkResultAdapter.removeAll(draft.unmount[name as ComponentName]);
            for (const name in draft.update) benchmarkResultAdapter.removeAll(draft.update[name as ComponentName]);
            break;

        /* istanbul ignore next */
        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }

    calculateAverageStats(draft);
};
