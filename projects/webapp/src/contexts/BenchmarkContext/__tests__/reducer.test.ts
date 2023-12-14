import produce from 'immer';

import type { BenchmarkResult } from 'src/types/benchmark';

import { initialState } from '../context';
import { reducer } from '../reducer';

describe(`Test reducer fn \`${reducer.name}\``, () => {
    const results: BenchmarkResult[] = [
        {
            name: 'noHooks',
            type: 'mount',
            order: 10,
            samples: 10,
            stats: { mean: 10, stdDev: 10, p95: 10, p99: 10, layout: 10 },
        },
        {
            name: 'useCallback',
            type: 'unmount',
            order: 20,
            samples: 20,
            stats: { mean: 20, stdDev: 20, p95: 20, p99: 20, layout: 20 },
        },
        {
            name: 'useMemo',
            type: 'update',
            order: 15,
            samples: 15,
            stats: { mean: 15, stdDev: 15, p95: 15, p99: 15, layout: 15 },
        },
        {
            name: 'useState',
            type: 'mount',
            order: 12,
            samples: 12,
            stats: { mean: 12, stdDev: 12, p95: 12, p99: 12, layout: 12 },
        },
    ];

    it('should add new benchmark results', () => {
        const reduce = produce(reducer);

        let state = initialState;
        for (const result of results) {
            state = reduce(state, { type: 'add', result });
        }

        expect(state).toMatchSnapshot();
    });

    it('should clear specific benchmark results', () => {
        const reduce = produce(reducer);

        let state = initialState;
        for (const result of results) {
            state = reduce(state, { type: 'add', result });
        }

        expect(reduce(state, { type: 'clear', benchmarkType: 'mount', componentName: 'noHooks' })).toMatchSnapshot();
    });

    it('should clear all benchmark results', () => {
        const reduce = produce(reducer);

        let state = initialState;
        for (const result of results) {
            state = reduce(state, { type: 'add', result });
        }

        expect(reduce(state, { type: 'clear-all' })).toMatchSnapshot();
    });
});
