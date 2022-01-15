import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '@easy/benchmark-js';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Debug;

const benchmark = new BenchmarkGroup();
benchmark.add('BenchmarkGroup-1', () => {});
benchmark.add('BenchmarkGroup-2', () => {});
benchmark.add('BenchmarkGroup-3', () => {});
benchmark.add('BenchmarkGroup-4', () => {});
benchmark.run();
