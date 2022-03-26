import { Arguments, BenchmarkJob, BenchmarkTestFnOptions } from 'benchmark-node';

type Test1 = (a: string) => string;
type Test2 = (a: string, b: string) => string;
type Test3 = (a: string, b: string, c: string) => string;
type Test4 = (a: string, b: string, c: string, d: string) => string;
type Test5 = (a: string, b: string, c: string, d: string, e: string) => string;

const options1: BenchmarkTestFnOptions<Test1> = {
    args: new Arguments('a'),
    jitArgs: [new Arguments('q'), new Arguments('z')],
};
const options2: BenchmarkTestFnOptions<Test2> = {
    args: new Arguments('a', 'b'),
    jitArgs: [new Arguments('q', 'w'), new Arguments('z', 'x')],
};
const options3: BenchmarkTestFnOptions<Test3> = {
    args: new Arguments('a', 'b', 'c'),
    jitArgs: [new Arguments('q', 'w', 'e'), new Arguments('z', 'x', 'c')],
};
const options4: BenchmarkTestFnOptions<Test4> = {
    args: new Arguments('a', 'b', 'c', 'd'),
    jitArgs: [new Arguments('q', 'w', 'e', 'r'), new Arguments('z', 'x', 'c', 'v')],
};
const options5: BenchmarkTestFnOptions<Test5> = {
    args: new Arguments('a', 'b', 'c', 'd', 'e'),
    jitArgs: [new Arguments('q', 'w', 'e', 'r', 't'), new Arguments('z', 'x', 'c', 'v', 'b')],
};

let _a: string;
let _b: string;
let _c: string;
let _d: string;
let _e: string;

const job = new BenchmarkJob();

job.addSetup(() => {
    _a = 'a';
    _b = 'b';
    _c = 'c';
    _d = 'd';
    _e = 'e';
});

job.add<Test1>('str-add-1-argument', (a) => a, options1);
job.add<Test1>('tpl-str-1-argument', (a) => `${a}`, options1);
job.add('str-add-1-closure ', () => _a);
job.add('tpl-str-1-closure ', () => `${_a}`);

job.add<Test2>('str-add-2-argument', (a, b) => a + b, options2);
job.add<Test2>('tpl-str-2-argument', (a, b) => `${a}${b}`, options2);
job.add('str-add-2-closure ', () => _a + _b);
job.add('tpl-str-2-closure ', () => `${_a}${_b}`);

job.add<Test3>('str-add-3-argument', (a, b, c) => a + b + c, options3);
job.add<Test3>('tpl-str-3-argument', (a, b, c) => `${a}${b}${c}`, options3);
job.add('str-add-3-closure ', () => _a + _b + _c);
job.add('tpl-str-3-closure ', () => `${_a}${_b}${_c}`);

job.add<Test4>('str-add-4-argument', (a, b, c, d) => a + b + c + d, options4);
job.add<Test4>('tpl-str-4-argument', (a, b, c, d) => `${a}${b}${c}${d}`, options4);
job.add('str-add-4-closure ', () => _a + _b + _c + _d);
job.add('tpl-str-4-closure ', () => `${_a}${_b}${_c}${_d}`);

job.add<Test5>('str-add-5-argument', (a, b, c, d, e) => a + b + c + d + e, options5);
job.add<Test5>('tpl-str-5-argument', (a, b, c, d, e) => `${a}${b}${c}${d}${e}`, options5);
job.add('str-add-5-closure ', () => _a + _b + _c + _d + _e);
job.add('tpl-str-5-closure ', () => `${_a}${_b}${_c}${_d}${_e}`);

job.run();
