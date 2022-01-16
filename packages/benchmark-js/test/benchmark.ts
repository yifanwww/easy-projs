import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '../src';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Debug;

const benchmark = new BenchmarkGroup();
benchmark.setEmptyTest();
benchmark.add('Benchmark-1', () => {});
benchmark.add('Benchmark-2', () => {});
benchmark.add('Benchmark-3', () => {});
benchmark.add('Benchmark-4', () => {});
benchmark.run();
