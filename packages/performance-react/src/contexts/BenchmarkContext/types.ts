import { BenchmarkResult, BenchmarkResultState, BenchmarkTypes } from 'src/common/benchmark';
import { ComponentName } from 'src/common/component';

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
