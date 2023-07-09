import type { ValueOf } from '@easy-pkg/utils-type';
import type { EntityState } from '@reduxjs/toolkit';
import type { BenchmarkType } from 'react-component-benchmark';

export type ComponentName = 'noHooks' | 'useMemo' | 'useCallback' | 'useRef' | 'useState' | 'useReducer';

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

export type BenchmarkResultState = EntityState<BenchmarkResult>;
