import { Benchmark } from './Benchmark';
import { BenchmarkOptions, TestFn } from './types';

export class BenchmarkGroup {
    private instances: Benchmark[] = [];

    public add(instance: Benchmark): this;
    public add(name: string, testFn: TestFn, options?: BenchmarkOptions): this;

    public add(...args: [Benchmark] | [string, TestFn, BenchmarkOptions?]): this {
        if (args.length === 1) {
            this.instances.push(args[0]);
        } else {
            this.instances.push(new Benchmark(...args));
        }
        return this;
    }

    public run() {
        for (const instance of this.instances) {
            instance.run();
            instance.printResult();
        }
    }
}
