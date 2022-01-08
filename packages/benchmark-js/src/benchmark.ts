import { tTable } from './constants';
import { BenchmarkOptions, BenchmarkSettings, BenchmarkStats, BenchmarkTestFns, TestFn, URA } from './types';
import { formatNumber, genStr, getCurrentTime, getMean, getMinTime, getVariance, sleep } from './utils';

export class Benchmark<Args extends URA> {
    private name: string;

    private testFn: TestFn<Args>;
    private getArgs: () => Args;

    private onComplete: Optional<Function>;
    private onStart: Optional<Function>;

    private settings: Required<BenchmarkSettings>;

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
     * @param testFn The function to benchmark.
     * @param options The options of benchmark.
     */
    constructor(name: string, testFn: TestFn<Args>, options?: BenchmarkOptions);
    /**
     * @param name The name used to identify this test.
     * @param testFns The test functions to benchmark.
     * @param options The options of benchmark.
     */
    constructor(name: string, testFns: BenchmarkTestFns<Args>, options?: BenchmarkOptions);

    constructor(name: string, testFns: TestFn<Args> | BenchmarkTestFns<Args>, options?: BenchmarkOptions) {
        this.name = name;

        const { getArgs, testFn } = this.parseConstructorArgs(testFns);
        this.getArgs = getArgs;
        this.testFn = testFn;

        this.onComplete = options?.onComplete ?? null;
        this.onStart = options?.onStart ?? null;

        this.settings = {
            delay: options?.delay ?? 0.005,
            initCount: options?.initCount ?? 1,
            maxPrepareTime: options?.maxPrepareTime ?? 1,
            maxTime: options?.maxTime ?? 5,
            minSamples: options?.minSamples ?? 5,
            minTime: options?.minTime || Math.max(getMinTime() * 100, 0.05),
        };

        this.count = this.settings.initCount;
    }

    private parseConstructorArgs(testFns: TestFn<Args> | BenchmarkTestFns<Args>): BenchmarkTestFns<Args> {
        const isObject = typeof testFns === 'object';
        return {
            getArgs: isObject ? testFns.getArgs : () => [] as never,
            testFn: isObject ? testFns.testFn : testFns,
        };
    }

    /**
     * Runs the benchmark.
     * @returns The benchmark instance.
     */
    public run(): this {
        this.running = true;

        this.onStart?.();

        this.benchmarking(this.settings.maxPrepareTime);
        // Delete samples generated while pre-benchmarking.
        this.stats.sample = [];
        this.benchmarking(this.settings.maxTime);
        this.evaluate();

        this.onComplete?.();

        return this;
    }

    private cycle(): number {
        const args = this.getArgs();

        const start = getCurrentTime();
        for (let i = 0; i < this.count; i++) {
            this.testFn(...args);
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
            if (used < this.settings.minTime) {
                this.count += Math.ceil((this.settings.minTime - used) / period);
            }

            elapsed += used;
            if (elapsed >= time && this.stats.sample.length >= this.settings.minSamples) break;

            sleep(this.settings.delay);
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
    public toString(): string {
        const size = this.stats.sample.length;

        const opsStr = formatNumber(this.stats.ops.toFixed(this.stats.ops < 100 ? 2 : 0));
        const rmeStr = this.stats.rme.toFixed(2);

        return this.name + genStr(` ${opsStr} ops/sec`, ` ${rmeStr}%`, ` (${size} sample${size > 1 ? 's' : ''})`);
    }
}
