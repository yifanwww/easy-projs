import { BenchmarkResult, BenchmarkResultState, BenchmarkTypes, ComponentName } from 'src/common/benchmark';

export interface IBenchmarkContext {
    mount: Record<ComponentName, BenchmarkResultState>;
    unmount: Record<ComponentName, BenchmarkResultState>;
    update: Record<ComponentName, BenchmarkResultState>;
    totalResults: BenchmarkResultState;
}

export interface IBenchmarkContextUpdaters {
    add: (record: BenchmarkResult) => void;
    clear: (benchmarkType: BenchmarkTypes, componentName: ComponentName) => void;
    clearAll: () => void;
}
