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

export interface BenchmarkJobCallbacks {
    /**
     * Called when benchmark starts running.
     */
    onStart?: () => void;
    /**
     * Called when the benchmark completes running.
     */
    onComplete?: () => void;
}

export interface BenchmarkJobSettings {
    /**
     * The delay between test cycles (ms).
     *
     * Default is `5`.
     */
    delay?: Millisecond;
    /**
     * The initial number of ops to run in a benchmark.
     *
     * Default is `16`.
     */
    initOps?: number;
    /**
     * The minimum time a benchmark uses.
     *
     * Default is `100`.
     */
    minSampleTime?: Millisecond;
    /**
     * The count of samples required to perform statistical analysis.
     *
     * Default is `15`.
     */
    samplesCount?: number;
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

export interface BenchmarkJobTestFnOptions {
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

export interface BenchmarkJobOptions extends BenchmarkJobCallbacks, BenchmarkJobSettings, BenchmarkJobTestFnOptions {}
