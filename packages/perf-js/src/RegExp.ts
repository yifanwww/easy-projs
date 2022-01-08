import { Benchmark } from '@easy/benchmark-js';

/** Used to avoid some optimization */
let res;
res;

const benchmark = new Benchmark('RegExp#test', () => {
    res = /o/.test('Hello World!');
});

benchmark.run();

console.log(benchmark.toString());
