// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Millisecond = number & { __ms__: void };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Nanosecond = number & { __ns__: void };

export interface _BenchmarkSettings {
    delay?: _Nanosecond;
    initCount?: number;
    maxAdjustTime?: _Nanosecond;
    maxPreparingTime?: _Nanosecond;
    maxTime?: _Nanosecond;
    minSamples?: number;
    minTime?: _Nanosecond;
}

export type Hrtime = [number, number];
