import { createEntityAdapter } from '@reduxjs/toolkit';

import { BenchmarkResult } from 'src/common/benchmark';

export const benchmarkResultAdapter = createEntityAdapter<BenchmarkResult>({
    selectId: (model) => model.order,
    sortComparer: (left, right) => left.order - right.order,
});

export const benchmarkResultSelector = benchmarkResultAdapter.getSelectors();
