import { BenchmarkRunner } from './BenchmarkRunner';
import { StagePrefix } from './constants';
import { ConsoleLogger } from './tools/ConsoleLogger';
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

    /**
     * Runs the benchmark.
     * @returns The benchmark instance.
     */
    public run(): this {
        const logger = ConsoleLogger.default;
        logger.writeLineHeader('// *************************');
        logger.writeLineHeader(`// Benchmark: ${this._name}`);

        this.logEnvironmentInfos();
        this.logConfigs();
        logger.writeLine();

        this.onStart?.();

        if (this.testFnOptions.jitArgsCount === 0) {
            this.benchmarkJitting1(StagePrefix.Jitting);
            this.benchmarkJitting2(StagePrefix.Jitting);
        } else {
            this.benchmarkJitting1(StagePrefix.Jitting, this.testFnOptions.jitArgs);
            this.benchmarkJitting2(StagePrefix.Jitting, this.testFnOptions.jitArgs);
        }
        ConsoleLogger.default.writeLine();

        if (this.testFnOptions.argsCount === 0) {
            const ops = this.benchmarkPilot(StagePrefix.Pilot);
            ConsoleLogger.default.writeLine();
            this.benchmarkFormal(StagePrefix.Formal, ops);
            ConsoleLogger.default.writeLine();

            this.stats.push(new Stats(this.samples));
        } else {
            for (const args of this.testFnOptions.args) {
                ConsoleLogger.default.writeLineInfo(`// arguments: ${args.toString()}`);
                ConsoleLogger.default.writeLine();

                // Reset variables before benchmarking.
                this.samples = [];

                const ops = this.benchmarkPilot(StagePrefix.Pilot, args);
                ConsoleLogger.default.writeLine();
                this.benchmarkFormal(StagePrefix.Formal, ops, args);
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
