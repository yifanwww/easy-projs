import { BenchmarkRunner } from './BenchmarkRunner';
import { StagePrefix } from './constants';
import { ConsoleLogger, LogKind } from './tools/ConsoleLogger';
import { Formatter } from './tools/Formatter';
import { Stats } from './tools/Stats';
import { BenchmarkJobOptions, TestFn } from './types';

export class BenchmarkJob extends BenchmarkRunner {
    /**
     * @param name The name used to identify this test.
     * @param testFn The function to benchmark.
     * @param options The options of benchmark.
     */
    constructor(name: string, testFn: TestFn, options: BenchmarkJobOptions = {}) {
        super(name, testFn, options);
    }

    private logConfigs() {
        const { delay, initOps, samplesCount, minSampleTime } = this.settings;

        const logger = ConsoleLogger.default;
        logger.writeLine(LogKind.Info, `// delay          : ${Formatter.beautifyNumber(delay)} ns`);
        logger.writeLine(LogKind.Info, `// initial ops    : ${Formatter.beautifyNumber(initOps)}`);
        logger.writeLine(LogKind.Info, `// min sample time: ${Formatter.beautifyNumber(minSampleTime)} ns`);
        logger.writeLine(LogKind.Info, `// samples count  : ${Formatter.beautifyNumber(samplesCount)}`);

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

        if (this.testFnOptions.jitArgsCount === 0) {
            this.benchmarkJitting(StagePrefix.Jitting);
        } else {
            for (const args of this.testFnOptions.jitArgs) {
                ConsoleLogger.default.writeLineInfo(`// arguments: ${args.toString()}`);
                this.benchmarkJitting(StagePrefix.Jitting, args);
            }
        }
        ConsoleLogger.default.writeLine();

        if (this.testFnOptions.argsCount === 0) {
            this.benchmarkPilot(StagePrefix.Pilot);
            ConsoleLogger.default.writeLine();
            this.benchmarkFormal(StagePrefix.Formal);
            ConsoleLogger.default.writeLine();

            this.stats.push(new Stats(this.samples));
        } else {
            for (const args of this.testFnOptions.args) {
                ConsoleLogger.default.writeLineInfo(`// arguments: ${args.toString()}`);
                ConsoleLogger.default.writeLine();

                // Reset variables before benchmarking.
                this.samples = [];
                this.ops = this.settings.initOps;

                this.benchmarkPilot(StagePrefix.Pilot, args);
                ConsoleLogger.default.writeLine();
                this.benchmarkFormal(StagePrefix.Formal, args);
                ConsoleLogger.default.writeLine();

                this.stats.push(new Stats(this.samples));
            }
        }

        this.onComplete?.();

        return this;
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
