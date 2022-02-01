/**
 * The type representing millisecond.
 */
export type Millisecond = number & {};

/**
 * The type representing nanosecond.
 *
 * The maximum safe integer in Javascript is `2^53 - 1` (`Number.MAX_SAFE_INTEGER`), can represent nanosecond.
 */
export type Nanosecond = number & {};

export type TestFn = (...args: never[]) => void;

export interface BenchmarkCallbacks {
    /**
     * Called when benchmark starts running.
     */
    onStart?: () => void;
    /**
     * Called when the benchmark completes running.
     */
    onComplete?: () => void;
}

export interface BenchmarkSettings {
    /**
     * The delay between test cycles (ms).
     *
     * Default is `5`.
     */
    delay?: Millisecond;
    /**
     * The default number of times to execute a test on a benchmark's first cycle.
     *
     * Default is `1`.
     */
    initCount?: number;
    /**
     * The maximum time a benchmark is allowed to run in adjust-benchmarking stage (ms).
     *
     * Default is `100`.
     *
     * Note: Cycle delays aren't counted toward the maximum time.
     */
    maxAdjustTime?: Millisecond;
    /**
     * The maximum time a benchmark is allowed to run in pre-benchmarking stage (ms).
     *
     * Default is `10`.
     *
     * Note: Cycle delays aren't counted toward the maximum time.
     */
    maxPreparingTime?: Millisecond;
    /**
     * The maximum time a benchmark is allowed to run in formal-benchmarking stage (ms).
     *
     * Default is `5_000`.
     *
     * Note: Cycle delays aren't counted toward the maximum time.
     */
    maxTime?: Millisecond;
    /**
     * The minimum sample size required to perform statistical analysis.
     *
     * Default is `5`.
     */
    minSamples?: number;
    /**
     * The time needed to reduce the percent uncertainty of measurement to 1% (ms).
     *
     * If not provided or is set to `0`, will automatically detect the minimum time.
     */
    minTime?: Millisecond;
}

/**
 * An array of the choices a argument can use.
 */
export type TestFnArgumentValues = unknown[];
/**
 * An array contains several arrays of the choices a argument can use.
 *
 * Example:
 * ```ts
 * [[1, 2], [true], ['a', 'b']]
 * ```
 */
export type TestFnArgumentsValues = Array<TestFnArgumentValues | undefined>;

export interface BenchmarkTestFnOptions {
    /**
     * Used for adjust-benchmarking and fomal-benchmarking.
     *
     * Example:
     * ```ts
     * [[1, 2], [true], ['a', 'b']]
     * ```
     */
    args?: TestFnArgumentsValues;
    /**
     * Used for pre-benchmarking. The arguments provided in `args` will be also added into `preArgs`.
     *
     *
     * Example:
     * ```ts
     * [[1, 2], [true], ['a', 'b']]
     * ```
     */
    preArgs?: TestFnArgumentsValues;
}

export interface BenchmarkOptions extends BenchmarkCallbacks, BenchmarkSettings, BenchmarkTestFnOptions {}
