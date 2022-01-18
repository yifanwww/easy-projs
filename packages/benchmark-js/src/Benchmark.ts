import { CodeGen, Tester, TesterContext } from './CodeGen';
import { tTable } from './constants';
import { Formatter } from './Formatter';
import { BenchmarkLoggerLevel, Logger } from './Logger';
import { Time } from './TimeTool';
import { genStr, getMean, getVariance } from './tools';
import { BenchmarkOptions, BenchmarkTestFnArguments, BenchmarkTestFnOptions, TestFn } from './types';
import { BenchmarkStats, _BenchmarkSettings, _Nanosecond } from './types.internal';

export class Benchmark {
    private static minTime: _Nanosecond = Time.ns(Math.max(Time.minResolution * 100, 50_000_000));

    private logger: Logger;

    private name: string;
    private testFn: TestFn;
    private tester: Tester;

    private onGetArguments: Optional<() => BenchmarkTestFnArguments>;
    private onGetArgumentsInPrebenchmarkStage: Optional<() => BenchmarkTestFnArguments | BenchmarkTestFnArguments[]>;

    private onComplete: Optional<() => void>;
    private onStart: Optional<() => void>;

    private settings: Required<_BenchmarkSettings>;
    private testFnOptions: DeepRequired<BenchmarkTestFnOptions>;

    private stats: BenchmarkStats = {
        deviation: 0,
        mean: Time.ns(0),
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
        this.logger = new Logger(name);

        this.name = name;
        this.testFn = testFn;

        const {
            argument,
            delay = 5,
            initCount = 1,
            maxAdjustTime = 10,
            maxPreparingTime = 100,
            maxTime = 5_000,
            minSamples = 5,
            minTime = 0,
            onComplete = null,
            onGetArguments = null,
            onGetArgumentsInPrebenchmarkStage = null,
            onStart = null,
        } = options ?? {};

        this.onGetArguments = onGetArguments;
        this.onGetArgumentsInPrebenchmarkStage = onGetArgumentsInPrebenchmarkStage;

        this.onComplete = onComplete;
        this.onStart = onStart;

        this.settings = {
            delay: Time.ms2ns(delay),
            initCount,
            maxAdjustTime: Time.ms2ns(maxAdjustTime),
            maxPreparingTime: Time.ms2ns(maxPreparingTime),
            maxTime: Time.ms2ns(maxTime),
            minSamples,
            minTime: minTime === 0 ? Benchmark.minTime : Time.ms2ns(minTime),
        };

        this.testFnOptions = {
            argument: {
                count: argument?.count ? Math.max(0, argument.count) : 0,
                rest: argument?.rest ?? false,
            },
        };

        // Gets a totally new function to test the performance of `testFn`.
        // Passing different callbacks into one same function who calls the callbacks will cause a optimization problem.
        // See "src/test/dynamicCall.ts".
        this.tester = CodeGen.createTester({
            argument: this.testFnOptions.argument,
        });

        this.count = this.settings.initCount;

        this.logConfigs();
    }

    public static get loggerLevel(): BenchmarkLoggerLevel {
        return Logger.level;
    }

    public static set loggerLevel(level: BenchmarkLoggerLevel) {
        Logger.level = level;
    }

    private logConfigs() {
        this.logger.debug(`delay             : ${Formatter.beautifyNumber(this.settings.delay)} ns`);
        this.logger.debug(`initial count     : ${Formatter.beautifyNumber(this.settings.initCount)}`);
        this.logger.debug(`max preparing time: ${Formatter.beautifyNumber(this.settings.maxPreparingTime)} ns`);
        this.logger.debug(`max time          : ${Formatter.beautifyNumber(this.settings.maxTime)} ns`);
        this.logger.debug(`min samples       : ${Formatter.beautifyNumber(this.settings.minSamples)}`);
        this.logger.debug(`min time          : ${Formatter.beautifyNumber(this.settings.minTime)} ns`);

        this.logger.debug(`${this.onComplete ? 'Has' : 'No'} callback \`onComplete\``);
        this.logger.debug(`${this.onStart ? 'Has' : 'No'} callback \`onStart\``);

        this.logger.debug();
    }

    /**
     * Runs the benchmark.
     * @returns The benchmark instance.
     */
    public run(): this {
        this.running = true;

        this.onStart?.();

        this.preBenchmarking();

        // Reset variables before adjust-benchmarking and benchmarking.
        // this.stats.sample = [];
        this.count = this.settings.initCount;
        this.adjustBenchmarking();
        this.formalBenchmarking();

        this.evaluate();

        this.logger.info(this.toString());
        this.logger.info();

        this.onComplete?.();

        this.running = false;

        return this;
    }

    private logTestData() {
        const { maxTime, minSamples, minTime } = this.settings;
        const { sample } = this.stats;

        const len = sample.length;
        const maxLen = Math.max(minSamples, maxTime / minTime).toString().length;

        this.logger.debug(`${len.toString().padStart(maxLen)}> elapsed: ${sample[len - 1].toFixed(6)} ns`);
    }

    private logCountChanging(from: number, to: number) {
        this.logger.debug(`count: ${Formatter.beautifyNumber(from)} -> ${Formatter.beautifyNumber(to)}`);
    }

    private preBenchmarking(): void {
        const args = this.onGetArgumentsInPrebenchmarkStage?.();
        if (!args) return;

        this.logger.info('Start pre-benchmarking...');
        for (const arg of Array.isArray(args) ? args : [args]) {
            this.benchmarking(this.settings.maxPreparingTime, arg, true);
        }
        this.logger.info('Finished pre-benchmarking.');
    }

    private adjustBenchmarking(): void {
        const args = this.onGetArguments?.();

        this.logger.info('Start adjust-benchmarking...');
        this.benchmarking(this.settings.maxAdjustTime, args, true);
        this.logger.info('Finished adjust-benchmarking.');
    }

    private formalBenchmarking(): void {
        const args = this.onGetArguments?.();

        this.logger.info('Start formal-benchmarking...');
        this.benchmarking(this.settings.maxTime, args);
        this.logger.info('Finished formal-benchmarking.');
    }

    private benchmarking(
        maxTime: _Nanosecond,
        args: BenchmarkTestFnArguments | undefined,
        preOrAdjust?: boolean,
    ): void {
        const testerContext: TesterContext = {
            arguments: args?.arguments,
            count: this.count,
            restArguments: args?.restArguments,
            testFn: this.testFn,
        };

        let duration: _Nanosecond = Time.ns(0);
        while (true) {
            testerContext.count = this.count;
            const used = Time.hrtime2ns(this.tester(testerContext));

            const elapsed = Time.ns(used / this.count);

            if (!preOrAdjust) this.stats.sample.push(elapsed);
            if (!preOrAdjust) this.logTestData();

            // Calculate how many more iterations it will take to achieve the `minTime`.
            // After pre-benchmarking stage, we should get a good count number.
            if (used < this.settings.minTime) {
                const count = this.count + Math.ceil((this.settings.minTime - used) / elapsed);
                this.logCountChanging(this.count, count);
                this.count = count;
            }

            duration = Time.ns(duration + used);
            if (preOrAdjust) {
                if (duration >= maxTime) break;
            } else {
                if (duration >= maxTime && this.stats.sample.length >= this.settings.minSamples) break;
            }

            Time.sleep(this.settings.delay);
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

        const opsStr = Formatter.beautifyNumber(this.stats.ops.toFixed(this.stats.ops < 100 ? 2 : 0));
        const rmeStr = this.stats.rme.toFixed(2);

        return genStr(`${opsStr} ops/sec`, ` ${rmeStr}%`, ` (${size} sample${size > 1 ? 's' : ''})`);
    }

    public writeResult(): void {
        this.logger.write(this.toString());
    }

    public writeTesterCode(): void {
        this.logger.writeLines(this.tester.toString());
        this.logger.write();
    }
}
