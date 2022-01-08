import { Benchmark } from './Benchmark';
import { BenchmarkOptions, BenchmarkTestFns, TestFn, URA } from './types';

type AddArgs<Args extends URA> =
    | [Benchmark<Args>]
    | [string, TestFn<Args>, BenchmarkOptions?]
    | [string, BenchmarkTestFns<Args>, BenchmarkOptions?];

export class BenchmarkGroup {
    private instances: Benchmark<URA>[] = [];

    private parseAddArgs<Args extends URA>(args: AddArgs<Args>): Benchmark<Args> {
        if (args.length === 1) return args[0];
        // @ts-ignore
        else return new Benchmark(...args);
    }

    public add<Args extends URA>(instance: Benchmark<Args>): this;
    public add<Args extends URA>(name: string, testFn: TestFn<Args>, options?: BenchmarkOptions): this;
    public add<Args extends URA>(name: string, testFns: BenchmarkTestFns<Args>, options?: BenchmarkOptions): this;

    public add<Args extends URA>(...args: AddArgs<Args>): this {
        const instance = this.parseAddArgs(args);
        this.instances.push(instance as never);
        return this;
    }

    public run() {
        for (const instance of this.instances) {
            instance.run();
            instance.printResult();
        }
    }
}
