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

    public setEmptyTest(name: string = 'EmptyTest'): this {
        this.instances = [new Benchmark(name, () => {}), ...this.instances];
        return this;
    }

    public run(): void {
        for (const instance of this.instances) instance.run();
        for (const instance of this.instances) instance.writeResult();
    }

    public writeTestersCode(): this {
        for (const instance of this.instances) instance.writeTesterCode();
        return this;
    }
}
