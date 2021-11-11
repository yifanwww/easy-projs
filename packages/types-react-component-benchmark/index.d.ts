import { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

export const BenchmarkType: {
    MOUNT: 'mount';
    UPDATE: 'update';
    UNMOUNT: 'unmount';
};

export interface ISample {
    start: number;
    end: number;
    elapsed: number;
    layout: number;
}

export interface IComputedResult {
    max: number;
    min: number;
    median: number;
    mean: number;
    stdDev: number;
    p70: number;
    p95: number;
    p99: number;
}

export interface IBenchResults extends IComputedResult {
    startTime: number;
    endTime: number;
    runTime: number;
    sampleCount: number;
    samples: ISample[];
    layout?: IComputedResult;
}

export interface IBenchmarkProps {
    component: ComponentType;
    componentProps?: {};
    includeLayout?: boolean;
    onComplete: (res: IBenchResults) => void;
    samples: number;
    timeout?: number;
    type: typeof BenchmarkType[keyof typeof BenchmarkType];
}

export interface IBenchmarkRef {
    start: () => void;
}

declare const Benchmark: ForwardRefExoticComponent<IBenchmarkProps & RefAttributes<IBenchmarkRef>>;

// eslint-disable-next-line import/no-default-export
export default Benchmark;
