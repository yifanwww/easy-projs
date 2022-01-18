import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '../src';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Debug;

const benchmark = new BenchmarkGroup();
benchmark.setEmptyTest();
benchmark.add('Benchmark-1', () => {});
benchmark.add('Benchmark-2', (arg1, arg2, arg3) => arg3, {
    argument: { count: 3 },
    onGetArguments: () => ({ arguments: ['hello', 'world', '!'] }),
    onGetArgumentsInPrebenchmarkStage: () => [{ arguments: [1, 2, undefined] }, { arguments: [true, () => {}, 'str'] }],
});
benchmark.writeTestersCode();
benchmark.run();
