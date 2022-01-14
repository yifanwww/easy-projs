import { tTable } from './constants';
import { Logger, LoggerLevel } from './Logger';
import { TU } from './TimeUnit';
import { BenchmarkOptions, TestFn } from './types';
import { BenchmarkStats, _BenchmarkSettings, _Nanosecond } from './types.internal';
import { formatNumber, genStr, getMean, getMinTime, getVariance, hrtime2ns, sleep } from './utils';

export class Benchmark {
    private static minTime: _Nanosecond = TU.ns(0);

    private name: string;

    private testFn: TestFn;

    private onComplete: Optional<Function>;
    private onStart: Optional<Function>;

    private settings: Required<_BenchmarkSettings>;

    private stats: BenchmarkStats = {
        deviation: 0,
        mean: TU.ns(0),
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
    constructor(name: string, testFn: TestFn, options?: BenchmarkOptions) {
        this.name = name;

        this.testFn = testFn;

        this.onComplete = options?.onComplete ?? null;
        this.onStart = options?.onStart ?? null;

        if (Benchmark.minTime === 0) {
            Benchmark.minTime = TU.ns(Math.max(getMinTime() * 100, 50_000_000));
        }

        this.settings = {
            delay: TU.ms2ns(options?.delay ?? 5),
            initCount: options?.initCount ?? 1,
            maxPrepareTime: TU.ms2ns(options?.maxPrepareTime ?? 1_000),
            maxTime: TU.ms2ns(options?.maxTime ?? 5_000),
            minSamples: options?.minSamples ?? 5,
            minTime:
                options?.minTime === undefined || options.minTime === 0 ? Benchmark.minTime : TU.ms2ns(options.minTime),
        };

        this.count = this.settings.initCount;
    }

    public static get loggerLevel(): LoggerLevel {
        return Logger.level;
    }

    public static set loggerLevel(level: LoggerLevel) {
        Logger.level = level;
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

    private cycle(): _Nanosecond {
        const begin = process.hrtime();
        for (let i = 0; i < this.count; i++) {
            this.testFn();
        }
        const duration = process.hrtime(begin);
        return hrtime2ns(duration);
    }

    private benchmarking(ns: _Nanosecond): void {
        let elapsed: _Nanosecond = TU.ns(0);
        while (true) {
            const used = this.cycle();
            const period = TU.ns(used / this.count);
            this.stats.sample.push(period);

            // Calculate how many more iterations it will take to achieve the `minTime`.
            // After pre-benchmarking stage, we should get a good count number.
            if (used < this.settings.minTime) {
                this.count += Math.ceil((this.settings.minTime - used) / period);
            }

            elapsed = TU.ns(elapsed + used);
            if (elapsed >= ns && this.stats.sample.length >= this.settings.minSamples) break;

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

        const ops = 1e9 / mean;

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

    public printResult(): void {
        Logger.log(this.toString());
    }
}
