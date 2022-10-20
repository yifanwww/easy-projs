import type { BenchmarkResult, BenchmarkResultState, BenchmarkTypes, ComponentName } from 'src/common/benchmark';

export type GroupBenchmarkResults = Record<ComponentName, BenchmarkResultState> & {
    average: Record<ComponentName, number>;
};

export interface IBenchmarkContextState {
    mount: GroupBenchmarkResults;
    unmount: GroupBenchmarkResults;
    update: GroupBenchmarkResults;
    totalResults: BenchmarkResultState;
}

export interface IBenchmarkContextUpdaters {
    add: (record: BenchmarkResult) => void;
    clear: (benchmarkType: BenchmarkTypes, componentName: ComponentName) => void;
    clearAll: () => void;
}
