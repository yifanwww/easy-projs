import { Benchmark } from '../src';

const benchmark = new Benchmark();
benchmark.setEmptyTest();
benchmark.add('Benchmark-1', () => {});
benchmark.add('Benchmark-2', (arg1, arg2, arg3) => arg3, {
    args: [[1, 2], [3], [5, 6]],
});
benchmark.writeTestersCode();
benchmark.run();
