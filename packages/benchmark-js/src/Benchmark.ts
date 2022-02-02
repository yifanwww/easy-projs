import { BenchmarkJob } from './BenchmarkJob';
import { ConsoleLogger, LogKind } from './tools/ConsoleLogger';
import { BenchmarkJobOptions, TestFn } from './types';

export class Benchmark {
    private jobs: BenchmarkJob[] = [];

    public add(job: BenchmarkJob): this;
    public add(name: string, testFn: TestFn, options?: BenchmarkJobOptions): this;

    public add(...args: [BenchmarkJob] | [string, TestFn, BenchmarkJobOptions?]): this {
        if (args.length === 1) {
            this.jobs.push(args[0]);
        } else {
            this.jobs.push(new BenchmarkJob(...args));
        }
        return this;
    }

    public setEmptyTest(name: string = 'EmptyTest'): this {
        this.jobs = [new BenchmarkJob(name, () => {}), ...this.jobs];
        return this;
    }

    public run(): void {
        const logger = ConsoleLogger.default;
        logger.writeLine(
            LogKind.Info,
            `// Found ${this.jobs.length} ${this.jobs.length > 1 ? 'benchmarks' : 'benchmark'}:`,
        );
        for (const job of this.jobs) {
            logger.writeLine(LogKind.Info, `//   ${job.name}`);
        }
        logger.writeLine();

        for (const job of this.jobs) job.run();
        for (const job of this.jobs) job.writeResult();
    }
}
