import { StagePrefix } from './constants';
import { Settings, TestFnOptions } from './options';
import { CodeGen, Tester, TesterContext } from './tools/CodeGen';
import { ConsoleLogger, LogKind } from './tools/ConsoleLogger';
import { Formatter } from './tools/Formatter';
import { Stats } from './tools/Stats';
import { Time } from './tools/TimeTool';
import { BenchmarkJobCallbacks, BenchmarkJobOptions, TestFn } from './types';
import { _Nanosecond, _TestFnArguments } from './types.internal';

interface BenchmarkImplOptions {
    args?: _TestFnArguments;
    loopCount?: number;
    onOpsFinished?: (used: _Nanosecond, elapsed: _Nanosecond) => void | boolean;
    stagePrefix: StagePrefix;
}

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
     * The number of ops to run in a benchmark.
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

        this.ops = this.settings.initOpsCount;

        this.testFnOptions = new TestFnOptions(options);

        // Gets a totally new function to test the performance of `testFn`.
        // Passing different callbacks into one same function who calls the callbacks will cause a optimization problem.
        // See "src/test/dynamicCall.ts".
        this.tester = CodeGen.createTester({
            argument: { count: this.testFnOptions.argsCount },
        });
    }

    private logConfigs() {
        const { delay, initOpsCount, samplesCount: minSamples, minSampleTime } = this.settings;

        const logger = ConsoleLogger.default;
        logger.writeLine(LogKind.Info, `// delay            : ${Formatter.beautifyNumber(delay)} ns`);
        logger.writeLine(LogKind.Info, `// initial ops count: ${Formatter.beautifyNumber(initOpsCount)}`);
        logger.writeLine(LogKind.Info, `// min samples      : ${Formatter.beautifyNumber(minSamples)}`);
        logger.writeLine(LogKind.Info, `// min sample time  : ${Formatter.beautifyNumber(minSampleTime)} ns`);

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
                this.ops = this.settings.initOpsCount;

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
        if (this.testFnOptions.preArgsGroupsCount === 0) {
            // Run double times for jitting
            this._benchmarkImpl({ loopCount: 2, stagePrefix: StagePrefix.Jitting });
        } else {
            for (const args of this.testFnOptions.preArgs) {
                // Run double times for jitting
                this._benchmarkImpl({ args, loopCount: 2, stagePrefix: StagePrefix.Jitting });
            }
        }

        ConsoleLogger.default.writeLine();
    }

    private pilot(args?: _TestFnArguments): void {
        this._benchmarkImpl({
            args,
            onOpsFinished: (used, elapsed) => {
                if (used > this.settings.minSampleTime) return false;

                // Calculate how many more iterations it will take to achieve the `minTime`.
                // After stage Pilot, we should get a good count number.
                if (used <= this.settings.minSampleTime) {
                    this.ops += Math.ceil((this.settings.minSampleTime - used) / elapsed);
                }
                return true;
            },
            stagePrefix: StagePrefix.Pilot,
        });
    }

    private formal(args?: _TestFnArguments): void {
        this._benchmarkImpl({
            args,
            loopCount: this.settings.samplesCount,
            onOpsFinished: (used, elapsed) => {
                this.samples.push(elapsed);
            },
            stagePrefix: StagePrefix.Formal,
        });
    }

    private logOpsData(stagePrefix: StagePrefix, index: number, used: _Nanosecond, elapsed: _Nanosecond) {
        const len = this.settings.samplesCount.toString().length;

        ConsoleLogger.default.writeLine(
            [
                stagePrefix,
                `${index.toString().padStart(len)}: `,
                `${this.ops} op, `,
                `${used} ns, `,
                `${elapsed.toFixed(4)} ns/op`,
            ].join(''),
        );
    }

    private _benchmarkImpl(options: BenchmarkImplOptions): void {
        const { args, onOpsFinished, loopCount, stagePrefix } = options;

        const testerContext: TesterContext = {
            args,
            ops: this.ops,
            testFn: this.testFn,
        };

        for (let index = 1; loopCount === undefined || index <= loopCount; index++) {
            testerContext.ops = this.ops;
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);

            const elapsed = Time.ns(used / this.ops);

            this.logOpsData(stagePrefix, index, used, elapsed);

            const flag = onOpsFinished?.(used, elapsed);
            if (flag === false) break;

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
