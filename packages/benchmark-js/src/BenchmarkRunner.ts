import { StagePrefix } from './constants';
import { Settings, TestFnOptions } from './options';
import { CodeGen, Tester, TesterContext } from './tools/CodeGen';
import { ConsoleLogger } from './tools/ConsoleLogger';
import { Stats } from './tools/Stats';
import { Time } from './tools/TimeTool';
import { BenchmarkJobCallbacks, BenchmarkJobOptions, TestFn } from './types';
import { _Arguments, _Nanosecond } from './types.internal';

export class BenchmarkRunner {
    protected _name: string;
    protected testFn: TestFn;
    protected tester: Tester;

    protected onComplete: Optional<BenchmarkJobCallbacks['onComplete']>;
    protected onStart: Optional<BenchmarkJobCallbacks['onStart']>;

    protected settings: Settings;
    protected testFnOptions: TestFnOptions;

    protected samples: _Nanosecond[] = [];
    protected stats: Stats[] = [];

    /**
     * The number of ops to run in a benchmark.
     */
    protected ops: number;

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
        this.ops = this.settings.initOps;

        this.testFnOptions = new TestFnOptions(options);

        // Gets a totally new function to test the performance of `testFn`.
        // Passing different callbacks into one same function who calls the callbacks will cause a optimization problem.
        // See "src/test/dynamicCall.ts".
        this.tester = CodeGen.createTester({
            argument: { count: this.testFnOptions.argsLength },
        });
    }

    protected benchmarkJitting(prefix: StagePrefix, args?: _Arguments): void {
        const testerContext: TesterContext = {
            args,
            ops: 1,
            testFn: this.testFn,
        };

        {
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);
            const elapsed = Time.ns(used);

            this.logOpsData(prefix, 1, 1, used, elapsed);
        }

        {
            testerContext.ops = this.ops;

            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);
            const elapsed = Time.ns(used);

            this.logOpsData(prefix, 2, this.ops, used, elapsed);
        }
    }

    protected benchmarkPilot(prefix: StagePrefix, args?: _Arguments): void {
        const testerContext: TesterContext = {
            args,
            ops: this.ops,
            testFn: this.testFn,
        };

        for (let index = 1; ; index++) {
            testerContext.ops = this.ops;
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);

            const elapsed = Time.ns(used / this.ops);

            this.logOpsData(prefix, index, this.ops, used, elapsed);

            // Calculate how many more iterations it will take to achieve the `minTime`.
            // After stage Pilot, we should get a good count number.
            if (used <= this.settings.minSampleTime) {
                this.ops += Math.ceil((this.settings.minSampleTime - used) / elapsed);
            } else {
                break;
            }

            Time.sleep(this.settings.delay);
        }
    }

    protected benchmarkFormal(prefix: StagePrefix, args?: _Arguments): void {
        const testerContext: TesterContext = {
            args,
            ops: this.ops,
            testFn: this.testFn,
        };

        for (let index = 1; index <= this.settings.samplesCount; index++) {
            const used = Time.hrtime2ns(this.tester(testerContext).elapsed);
            const elapsed = Time.ns(used / this.ops);

            this.logOpsData(prefix, index, this.ops, used, elapsed);

            this.samples.push(elapsed);

            Time.sleep(this.settings.delay);
        }
    }

    private logOpsData(prefix: StagePrefix, index: number, ops: number, used: _Nanosecond, elapsed: _Nanosecond) {
        const len = this.settings.samplesCount.toString().length;

        ConsoleLogger.default.writeLine(
            [
                prefix,
                `${index.toString().padStart(len)}: `,
                `${ops} op, `,
                `${used} ns, `,
                `${elapsed.toFixed(4)} ns/op`,
            ].join(''),
        );
    }
}
