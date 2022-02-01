import { StagePrefix } from './constants';
import { Settings, TestFnOptions } from './options';
import { CodeGen, Tester, TesterContext } from './tools/CodeGen';
import { ConsoleLogger, LogKind } from './tools/ConsoleLogger';
import { Formatter } from './tools/Formatter';
import { Stats } from './tools/Stats';
import { Time } from './tools/TimeTool';
import { BenchmarkJobCallbacks, BenchmarkJobOptions, TestFn } from './types';
import { _Nanosecond, _TestFnArguments } from './types.internal';

export class BenchmarkJob {
    private _name: string;
    private testFn: TestFn;
    private tester: Tester;

    private onComplete: Optional<BenchmarkJobCallbacks['onComplete']>;
    private onStart: Optional<BenchmarkJobCallbacks['onStart']>;

    private settings: Settings;
    private testFnOptions: TestFnOptions;

    private samples: _Nanosecond[] = [];
    private stats: Stats[] = [];

    /**
     * The number of ops to be run in a benchmark.
     */
    private ops: number;

    public get name(): string {
        return this._name;
    }

    /**
     * @param name The name used to identify this test.
     * @param testFn The function to benchmark.
     * @param options The options of benchmark.
     */
    constructor(name: string, testFn: TestFn, options: BenchmarkJobOptions = {}) {
        this._name = name;
        this.testFn = testFn;

        const { onComplete = null, onStart = null } = options;

        this.onComplete = onComplete;
        this.onStart = onStart;

        this.settings = new Settings(options);

        this.ops = this.settings.initCount;

        this.testFnOptions = new TestFnOptions(options);

        // Gets a totally new function to test the performance of `testFn`.
        // Passing different callbacks into one same function who calls the callbacks will cause a optimization problem.
        // See "src/test/dynamicCall.ts".
        this.tester = CodeGen.createTester({
            argument: { count: this.testFnOptions.argsCount },
        });
    }

    private logConfigs() {
        const { delay, initCount, maxAdjustTime, maxPreparingTime, maxTime, minSamples, minTime } = this.settings;

        const logger = ConsoleLogger.default;
        logger.writeLine(LogKind.Info, `// delay             : ${Formatter.beautifyNumber(delay)} ns`);
        logger.writeLine(LogKind.Info, `// initial count     : ${Formatter.beautifyNumber(initCount)}`);
        logger.writeLine(LogKind.Info, `// max preparing time: ${Formatter.beautifyNumber(maxPreparingTime)} ns`);
        logger.writeLine(LogKind.Info, `// max adjust time   : ${Formatter.beautifyNumber(maxAdjustTime)} ns`);
        logger.writeLine(LogKind.Info, `// max time          : ${Formatter.beautifyNumber(maxTime)} ns`);
        logger.writeLine(LogKind.Info, `// min samples       : ${Formatter.beautifyNumber(minSamples)}`);
        logger.writeLine(LogKind.Info, `// min time          : ${Formatter.beautifyNumber(minTime)} ns`);

        logger.writeLine(LogKind.Info, `// ${this.onComplete ? 'Has' : 'No'} callback \`onComplete\``);
        logger.writeLine(LogKind.Info, `// ${this.onStart ? 'Has' : 'No'} callback \`onStart\``);

        logger.writeLine();
    }

    /**
     * Runs the benchmark.
     * @returns The benchmark instance.
     */
    public run(): this {
        const logger = ConsoleLogger.default;
        logger.writeLine(LogKind.Header, '// *************************');
        logger.writeLine(LogKind.Header, `// Benchmark: ${this._name}`);

        this.logConfigs();

        this.onStart?.();

        this.jitting();

        if (this.testFnOptions.argsGroupsCount === 0) {
            this.pilot();
            ConsoleLogger.default.writeLine();
            this.formal();
            ConsoleLogger.default.writeLine();

            this.stats.push(new Stats(this.samples));
        } else {
            for (const args of this.testFnOptions.args) {
                // Reset variables before adjust-benchmarking and benchmarking.
                this.samples = [];
                this.ops = this.settings.initCount;

                this.pilot(args);
                ConsoleLogger.default.writeLine();
                this.formal(args);
                ConsoleLogger.default.writeLine();

                this.stats.push(new Stats(this.samples));
            }
        }

        this.onComplete?.();

        return this;
    }

    private jitting(): void {
        if (this.testFnOptions.preArgsGroupsCount === 0) return;

        for (const args of this.testFnOptions.preArgs) {
            this._benchmarkImpl(StagePrefix.Jitting, this.settings.maxPreparingTime, args, true);
        }
        ConsoleLogger.default.writeLine();
    }

    private pilot(args?: _TestFnArguments): void {
        this._benchmarkImpl(StagePrefix.Pilot, this.settings.maxAdjustTime, args, true);
    }

    private formal(args?: _TestFnArguments): void {
        this._benchmarkImpl(StagePrefix.Formal, this.settings.maxTime, args);
    }

    private logOpsData(stagePrefix: StagePrefix, index: number, used: _Nanosecond, elapsed: _Nanosecond) {
        const { maxTime, minSamples, minTime } = this.settings;
        const maxLen = Math.max(minSamples, maxTime / minTime).toString().length;

        ConsoleLogger.default.writeLine(
            [
                stagePrefix,
                `${index.toString().padStart(maxLen)}: `,
                `${this.ops} op, `,
                `${used} ns, `,
                `${elapsed.toFixed(4)} ns/op`,
            ].join(''),
        );
    }

    private _benchmarkImpl(
        stagePrefix: StagePrefix,
        maxTime: _Nanosecond,
        args?: _TestFnArguments,
        preOrAdjust?: boolean,
    ): void {
        const testerContext: TesterContext = {
            args,
            ops: this.ops,
            testFn: this.testFn,
        };

        let duration: _Nanosecond = Time.ns(0);
        for (let index = 1; ; index++) {
            testerContext.ops = this.ops;
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);

            const elapsed = Time.ns(used / this.ops);

            if (!preOrAdjust) this.samples.push(elapsed);

            this.logOpsData(stagePrefix, index, used, elapsed);

            // Calculate how many more iterations it will take to achieve the `minTime`.
            // After stage `jitting`, we should get a good count number.
            if (used < this.settings.minTime) {
                this.ops += Math.ceil((this.settings.minTime - used) / elapsed);
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
            ConsoleLogger.default.writeLineStatistic(`${this._name}: ${this.stats[0].toString()}`);
        } else {
            for (let i = 0; i < this.stats.length; i++) {
                ConsoleLogger.default.writeLineStatistic(`${this._name}: ${this.stats[i].toString(i + 1)}`);
            }
        }
    }
}
