import { EntityState } from '@reduxjs/toolkit';
import { BenchmarkType } from 'react-component-benchmark';

import { ComponentName } from './component';

export type BenchmarkTypes = ValueOf<typeof BenchmarkType>;

export interface BenchmarkStats {
    mean: number;
    stdDev: number;
    p95: number;
    p99: number;
    layout: number;
}

export interface BenchmarkResult {
    name: ComponentName;
    type: BenchmarkTypes;
    order: number;
    samples: number;
    stats: BenchmarkStats;
}

export const genBenchmarkResultDisplayName = (benchmarkType: BenchmarkTypes, componentName: ComponentName) =>
    `${componentName} - ${benchmarkType}`;

export type BenchmarkResultState = EntityState<BenchmarkResult>;
