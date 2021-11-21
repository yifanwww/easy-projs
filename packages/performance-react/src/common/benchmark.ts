import { BenchmarkType } from 'react-component-benchmark';

export type BenchmarkTypes = typeof BenchmarkType[keyof typeof BenchmarkType];

export interface BenchmarkResult {
    name: string;
    order: number;
    samples: number;
    mean: number;
    stdDev: number;
    p95: number;
    p99: number;
    layout: number;
}
