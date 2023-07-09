import type { BenchmarkResult, BenchmarkResultState, BenchmarkTypes, ComponentName } from 'src/types/benchmark';

export type GroupBenchmarkResults = Record<ComponentName, BenchmarkResultState> & {
    average: Record<ComponentName, number>;
};

export interface BenchmarkContextState {
    mount: GroupBenchmarkResults;
    unmount: GroupBenchmarkResults;
    update: GroupBenchmarkResults;
    totalResults: BenchmarkResultState;
}

export interface BenchmarkContextUpdaters {
    add: (record: BenchmarkResult) => void;
    clear: (benchmarkType: BenchmarkTypes, componentName: ComponentName) => void;
    clearAll: () => void;
}
