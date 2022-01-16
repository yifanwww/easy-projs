import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '@easy/benchmark-js';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Info;

let a: string;
a = 'a';
let b: string;
b = 'b';
let c: string;
c = 'c';
let d: string;
d = 'd';
let e: string;
e = 'e';

const benchmark = new BenchmarkGroup();
benchmark.setEmptyTest();

benchmark.add('string-addition-1', () => a);
benchmark.add('string-addition-2', () => a + b);
benchmark.add('string-addition-3', () => a + b + c);
benchmark.add('string-addition-4', () => a + b + c + d);
benchmark.add('string-addition-5', () => a + b + c + d + e);

benchmark.add('template-string-1', () => `${a}`);
benchmark.add('template-string-2', () => `${a}${b}`);
benchmark.add('template-string-3', () => `${a}${b}${c}`);
benchmark.add('template-string-4', () => `${a}${b}${c}${d}`);
benchmark.add('template-string-5', () => `${a}${b}${c}${d}${e}`);

benchmark.run();
