import { CodeGen, Tester, TesterContext } from './CodeGen';
import { Formatter } from './Formatter';
import { BenchmarkLoggerLevel, Logger } from './Logger';
import { Settings, TestFnOptions } from './options';
import { Stats } from './Stats';
import { Time } from './TimeTool';
import { BenchmarkCallbacks, BenchmarkOptions, TestFn } from './types';
import { _Nanosecond, _TestFnArguments } from './types.internal';

export class Benchmark {
    private logger: Logger;

    private name: string;
    private testFn: TestFn;
    private tester: Tester;

    private onComplete: Optional<BenchmarkCallbacks['onComplete']>;
    private onStart: Optional<BenchmarkCallbacks['onStart']>;

    private settings: Settings;
    private testFnOptions: TestFnOptions;

    private samples: _Nanosecond[] = [];
    private stats: Stats[] = [];

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
    constructor(name: string, testFn: TestFn, options: BenchmarkOptions = {}) {
        this.logger = new Logger(name);

        this.name = name;
        this.testFn = testFn;

        const { onComplete = null, onStart = null } = options;

        this.onComplete = onComplete;
        this.onStart = onStart;

        this.settings = new Settings(options);

        this.count = this.settings.initCount;

        this.testFnOptions = new TestFnOptions(options);

        // Gets a totally new function to test the performance of `testFn`.
        // Passing different callbacks into one same function who calls the callbacks will cause a optimization problem.
        // See "src/test/dynamicCall.ts".
        this.tester = CodeGen.createTester({
            argument: { count: this.testFnOptions.argsCount },
        });

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

        if (this.testFnOptions.argsGroupsCount === 0) {
            this.adjustBenchmarking();
            this.formalBenchmarking();

            this.stats.push(new Stats(this.samples));

            this.logger.info(this.stats[0].toString());
            this.logger.info();
        } else {
            for (const args of this.testFnOptions.args) {
                // Reset variables before adjust-benchmarking and benchmarking.
                this.samples = [];
                this.count = this.settings.initCount;

                this.adjustBenchmarking(args);
                this.formalBenchmarking(args);

                this.stats.push(new Stats(this.samples));

                this.logger.info(this.stats[this.stats.length - 1].toString());
                this.logger.info();
            }
        }

        this.onComplete?.();

        this.running = false;

        return this;
    }

    private logTestData() {
        const { maxTime, minSamples, minTime } = this.settings;

        const len = this.samples.length;
        const maxLen = Math.max(minSamples, maxTime / minTime).toString().length;

        this.logger.debug(`${len.toString().padStart(maxLen)}> elapsed: ${this.samples[len - 1].toFixed(6)} ns`);
    }

    private logCountChanging(from: number, to: number) {
        this.logger.debug(`count: ${Formatter.beautifyNumber(from)} -> ${Formatter.beautifyNumber(to)}`);
    }

    private preBenchmarking(): void {
        if (this.testFnOptions.preArgsGroupsCount === 0) return;

        this.logger.info('Start pre-benchmarking...');
        for (const args of this.testFnOptions.preArgs) {
            this.benchmarking(this.settings.maxPreparingTime, args, true);
        }
        this.logger.info('Finished pre-benchmarking.');
        this.logger.info();
    }

    private adjustBenchmarking(args?: _TestFnArguments): void {
        this.logger.info('Start adjust-benchmarking...');
        this.benchmarking(this.settings.maxAdjustTime, args, true);
        this.logger.info('Finished adjust-benchmarking.');
    }

    private formalBenchmarking(args?: _TestFnArguments): void {
        this.logger.info('Start formal-benchmarking...');
        this.benchmarking(this.settings.maxTime, args);
        this.logger.info('Finished formal-benchmarking.');
    }

    private benchmarking(maxTime: _Nanosecond, args?: _TestFnArguments, preOrAdjust?: boolean): void {
        const testerContext: TesterContext = {
            args,
            count: this.count,
            testFn: this.testFn,
        };

        let duration: _Nanosecond = Time.ns(0);
        while (true) {
            testerContext.count = this.count;
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);

            const elapsed = Time.ns(used / this.count);

            if (!preOrAdjust) this.samples.push(elapsed);
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
                if (duration >= maxTime && this.samples.length >= this.settings.minSamples) break;
            }

            Time.sleep(this.settings.delay);
        }
    }

    public writeResult(): void {
        if (this.stats.length === 0) return;

        if (this.stats.length === 1) {
            this.logger.write(this.stats[0].toString());
        } else {
            for (let i = 0; i < this.stats.length; i++) {
                this.logger.write(this.stats[i].toString(i + 1));
            }
        }
    }

    public writeTesterCode(): void {
        this.logger.debug('testFn code:');
        this.logger.debug(this.tester.toString());
        this.logger.debug();
    }
}
