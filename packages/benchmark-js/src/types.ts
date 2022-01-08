export type URA = ReadonlyArray<unknown>;

export type TestFn<Args extends URA> = (...args: Args) => void;

export interface BenchmarkTestFns<Args extends URA> {
    getArgs: () => Args;
    testFn: TestFn<Args>;
}

export interface BenchmarkCallbacks {
    /**
     * Called when benchmark starts running.
     */
    onStart?: AnyFn;
    /**
     * Called when the benchmark completes running.
     */
    onComplete?: AnyFn;
}

export interface BenchmarkSettings {
    /**
     * The delay between test cycles (secs).
     *
     * Default is `0.005`.
     */
    delay?: number;
    /**
     * The default number of times to execute a test on a benchmark's first cycle.
     *
     * Default is `1`.
     */
    initCount?: number;
    /**
     * The maximum time preparing is allowed to run before benchmarking.
     *
     * Default is `1`.
     *
     * Note: Cycle delays aren't counted toward the maximum time.
     */
    maxPrepareTime?: number;
    /**
     * The maximum time a benchmark is allowed to run before finishing (secs).
     *
     * Default is `5`.
     *
     * Note: Cycle delays aren't counted toward the maximum time.
     */
    maxTime?: number;
    /**
     * The minimum sample size required to perform statistical analysis.
     *
     * Default is `5`.
     */
    minSamples?: number;
    /**
     * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
     *
     * If not provided or is set to `0`, will automatically detect the minimum time.
     */
    minTime?: number;
}

export interface BenchmarkOptions extends BenchmarkCallbacks, BenchmarkSettings {}

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
    mean: number;
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
    sample: number[];
    /**
     * The standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
     */
    sem: number;
    /**
     * The sample variance.
     */
    variance: number;
}
