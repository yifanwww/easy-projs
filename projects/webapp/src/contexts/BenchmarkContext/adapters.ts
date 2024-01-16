import { createEntityAdapter } from '@reduxjs/toolkit';

import type { BenchmarkResult } from 'src/types/benchmark';

export const benchmarkResultAdapter = createEntityAdapter<BenchmarkResult, number>({
    selectId: (model) => model.order,
    sortComparer: (left, right) => left.order - right.order,
});

export const benchmarkResultSelector = benchmarkResultAdapter.getSelectors();
