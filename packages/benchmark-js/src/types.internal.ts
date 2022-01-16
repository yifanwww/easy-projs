// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Millisecond = number & { __ms__: void };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Nanosecond = number & { __ns__: void };

export interface _BenchmarkSettings {
    delay?: _Nanosecond;
    initCount?: number;
    maxPreparingTime?: _Nanosecond;
    maxTime?: _Nanosecond;
    minSamples?: number;
    minTime?: _Nanosecond;
}

/**
 * An object of stats including mean, margin or error, and standard deviation.
 */
export interface BenchmarkStats {
    /**
     * The sample standard deviation.
     */
    deviation: number;
    /**
     * The sample arithmetic mean (secs).
     */
    mean: _Nanosecond;
    /**
     * The margin of error.
     */
    moe: number;
    /**
     * The number of executions per second.
     */
    ops: number;
    /**
     * The relative margin of error (expressed as a percentage of the mean).
     */
    rme: number;
    /**
     * The array of sampled periods.
     */
    sample: _Nanosecond[];
    /**
     * The standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
     */
    sem: number;
    /**
     * The sample variance.
     */
    variance: number;
}

export type Hrtime = [number, number];
