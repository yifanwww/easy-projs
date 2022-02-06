import { Arguments, Benchmark, BenchmarkJobTestFnOptions } from 'benchmark-node';

type Test1 = (a: string) => string;
type Test2 = (a: string, b: string) => string;
type Test3 = (a: string, b: string, c: string) => string;
type Test4 = (a: string, b: string, c: string, d: string) => string;
type Test5 = (a: string, b: string, c: string, d: string, e: string) => string;

const options1: BenchmarkJobTestFnOptions<Test1> = {
    args: new Arguments('a'),
    jitArgs: [new Arguments('q'), new Arguments('z')],
};
const options2: BenchmarkJobTestFnOptions<Test2> = {
    args: new Arguments('a', 'b'),
    jitArgs: [new Arguments('q', 'w'), new Arguments('z', 'x')],
};
const options3: BenchmarkJobTestFnOptions<Test3> = {
    args: new Arguments('a', 'b', 'c'),
    jitArgs: [new Arguments('q', 'w', 'e'), new Arguments('z', 'x', 'c')],
};
const options4: BenchmarkJobTestFnOptions<Test4> = {
    args: new Arguments('a', 'b', 'c', 'd'),
    jitArgs: [new Arguments('q', 'w', 'e', 'r'), new Arguments('z', 'x', 'c', 'v')],
};
const options5: BenchmarkJobTestFnOptions<Test5> = {
    args: new Arguments('a', 'b', 'c', 'd', 'e'),
    jitArgs: [new Arguments('q', 'w', 'e', 'r', 't'), new Arguments('z', 'x', 'c', 'v', 'b')],
};

let _a: string;
let _b: string;
let _c: string;
let _d: string;
let _e: string;

const benchmark = new Benchmark();

benchmark.addSetup(() => {
    _a = 'a';
    _b = 'b';
    _c = 'c';
    _d = 'd';
    _e = 'e';
});

benchmark.add<Test1>('str-add-1-argument', (a) => a, options1);
benchmark.add<Test1>('tpl-str-1-argument', (a) => `${a}`, options1);
benchmark.add('str-add-1-closure ', () => _a);
benchmark.add('tpl-str-1-closure ', () => `${_a}`);

benchmark.add<Test2>('str-add-2-argument', (a, b) => a + b, options2);
benchmark.add<Test2>('tpl-str-2-argument', (a, b) => `${a}${b}`, options2);
benchmark.add('str-add-2-closure ', () => _a + _b);
benchmark.add('tpl-str-2-closure ', () => `${_a}${_b}`);

benchmark.add<Test3>('str-add-3-argument', (a, b, c) => a + b + c, options3);
benchmark.add<Test3>('tpl-str-3-argument', (a, b, c) => `${a}${b}${c}`, options3);
benchmark.add('str-add-3-closure ', () => _a + _b + _c);
benchmark.add('tpl-str-3-closure ', () => `${_a}${_b}${_c}`);

benchmark.add<Test4>('str-add-4-argument', (a, b, c, d) => a + b + c + d, options4);
benchmark.add<Test4>('tpl-str-4-argument', (a, b, c, d) => `${a}${b}${c}${d}`, options4);
benchmark.add('str-add-4-closure ', () => _a + _b + _c + _d);
benchmark.add('tpl-str-4-closure ', () => `${_a}${_b}${_c}${_d}`);

benchmark.add<Test5>('str-add-5-argument', (a, b, c, d, e) => a + b + c + d + e, options5);
benchmark.add<Test5>('tpl-str-5-argument', (a, b, c, d, e) => `${a}${b}${c}${d}${e}`, options5);
benchmark.add('str-add-5-closure ', () => _a + _b + _c + _d + _e);
benchmark.add('tpl-str-5-closure ', () => `${_a}${_b}${_c}${_d}${_e}`);

benchmark.run();
