import { Benchmark } from '../src';

/** Used to avoid some optimization */
let res;

const benchmark = new Benchmark('String#indexOf', () => {
    res = 'Hello World!'.indexOf('o') > -1;
});

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
res;

benchmark.run();

console.log(benchmark.toString());