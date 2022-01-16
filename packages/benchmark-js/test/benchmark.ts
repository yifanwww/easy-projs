import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '@easy/benchmark-js';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Debug;

const benchmark = new BenchmarkGroup();
benchmark.add('Benchmark-1', () => {});
benchmark.add('Benchmark-2', () => {});
benchmark.add('Benchmark-3', () => {});
benchmark.add('Benchmark-4', () => {});
benchmark.run();
