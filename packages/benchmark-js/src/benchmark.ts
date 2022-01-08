import { BenchmarkBase } from './benchmarkBase';
import { tTable } from './constants';
import { formatNumber, genStr, getCurrentTime, getVariance, getMean, sleep, getMinTime } from './utils';

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

export interface BenchmarkOptions {
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

export class Benchmark<F extends UnknownFn> extends BenchmarkBase {
    private name: string;

    private fn: F;

    private onComplete: Optional<Function>;
    private onStart: Optional<Function>;

    private options: Required<BenchmarkOptions>;

    private stats: BenchmarkStats = {
        deviation: 0,
        mean: 0,
        moe: 0,
        ops: 0,
        rme: 0,
        sample: [],
        sem: 0,
        variance: 0,
    };

    /**
     * A flag to indicate if the benchmark is running.
     */
    private running: boolean = false;
    /**
     * The number of times a test was executed.
     */
    private count: number;

    /**
     * @param name The name used to identify this test.
     * @param fn The function to benchmark.
     * @param options The options of benchmark.
     */
    constructor(name: string, fn: F, options: BenchmarkOptions & BenchmarkCallbacks = {}) {
        super();

        this.name = name;
        this.fn = fn;

        this.onComplete = options.onComplete ?? null;
        this.onStart = options.onStart ?? null;

        this.options = {
            delay: options.delay ?? 0.005,
            initCount: options.initCount ?? 1,
            maxPrepareTime: options.maxPrepareTime ?? 1,
            maxTime: options.maxTime ?? 5,
            minSamples: options.minSamples ?? 5,
            minTime: options.minTime || Math.max(getMinTime() * 100, 0.05),
        };

        this.count = this.options.initCount;
    }

    /**
     * Runs the benchmark.
     * @returns The benchmark instance.
     */
    public run(): this {
        this.running = true;

        this.onStart?.();

        this.benchmarking(this.options.maxPrepareTime);
        // Delete samples generated while pre-benchmarking.
        this.stats.sample = [];
        this.benchmarking(this.options.maxTime);
        this.evaluate();

        this.onComplete?.();

        return this;
    }

    private cycle(): number {
        const start = getCurrentTime();
        for (let i = 0; i < this.count; i++) {
            this.fn();
        }
        const end = getCurrentTime();
        return end - start;
    }

    private benchmarking(time: number): void {
        let elapsed = 0;
        while (true) {
            const used = this.cycle();
            const period = used / this.count;
            this.stats.sample.push(period);

            // Calculate how many more iterations it will take to achieve the `minTime`.
            // After pre-benchmarking stage, we should get a good count number.
            if (used < this.options.minTime) {
                this.count += Math.ceil((this.options.minTime - used) / period);
            }

            elapsed += used;
            if (elapsed >= time && this.stats.sample.length >= this.options.minSamples) break;

            sleep(this.options.delay);
        }
    }

    /**
     * Computes stats on benchmark results.
     */
    private evaluate(): void {
        const size = this.stats.sample.length;

        const mean = getMean(this.stats.sample);
        const variance = getVariance(this.stats.sample, mean);
        const deviation = Math.sqrt(variance);
        const sem = deviation / Math.sqrt(size);
        const critical = tTable[size - 1] ?? tTable.infinity;
        const moe = sem * critical;
        const rme = (moe / mean) * 100 ?? 0;

        const ops = 1 / mean;

        this.stats = {
            deviation,
            mean,
            moe,
            ops,
            rme,
            sample: this.stats.sample,
            sem,
            variance,
        };
    }

    /**
     * Displays relevant benchmark information when coerced to a string.
     * @returns A string representation of the benchmark instance.
     */
    public override toString(): string {
        const size = this.stats.sample.length;

        const opsStr = formatNumber(this.stats.ops.toFixed(this.stats.ops < 100 ? 2 : 0));
        const rmeStr = this.stats.rme.toFixed(2);

        return this.name + genStr(` ${opsStr} ops/sec`, ` ${rmeStr}%`, ` (${size} sample${size > 1 ? 's' : ''})`);
    }
}
