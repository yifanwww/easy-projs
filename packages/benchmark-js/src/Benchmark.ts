import { BenchmarkJob } from './BenchmarkJob';
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
        for (const job of this.jobs) job.run();
        for (const job of this.jobs) job.writeResult();
    }
}
