import { Benchmark } from '@easy/benchmark-javascript';

/** Used to avoid some optimization */
let res;
res;

const benchmark = new Benchmark('String#indexOf', () => {
    res = 'Hello World!'.indexOf('o') > -1;
});

benchmark.run();

console.log(benchmark.toString());
