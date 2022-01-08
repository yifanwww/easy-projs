import { Benchmark } from '@easy/benchmark-javascript';

/** Used to avoid some optimization */
let res;
res;

function fn1(options?: Record<string, unknown>) {
    options || (options = {});
    return options;
}

function fn2(options: Record<string, unknown> = {}) {
    return options;
}

const benchmark1 = new Benchmark('ES5#default', () => {
    res = fn1();
});

const benchmark2 = new Benchmark('ES6#default', () => {
    res = fn2();
});

benchmark1.run();
console.log(benchmark1.toString());
benchmark2.run();
console.log(benchmark2.toString());
