import { BenchmarkGroup, BenchmarkTestFnOptions } from '@easy/benchmark-js';

const options: BenchmarkTestFnOptions = {
    args: [['a'], ['b'], ['c'], ['d'], ['e']],
    preArgs: [
        ['q', 'z'],
        ['w', 'x'],
        ['e', 'c'],
        ['r', 'v'],
        ['t', 'b'],
    ],
};

let _a: string;
_a = 'a';
let _b: string;
_b = 'b';
let _c: string;
_c = 'c';
let _d: string;
_d = 'd';
let _e: string;
_e = 'e';

const benchmark = new BenchmarkGroup();
benchmark.setEmptyTest();

benchmark.add('str-add-1-argument', (a) => a, options);
benchmark.add('tpl-str-1-argument', (a) => `${a}`, options);
benchmark.add('str-add-1-closure ', () => _a);
benchmark.add('tpl-str-1-closure ', () => `${_a}`);

benchmark.add('str-add-2-argument', (a, b) => a + b, options);
benchmark.add('tpl-str-2-argument', (a, b) => `${a}${b}`, options);
benchmark.add('str-add-2-closure ', () => _a + _b);
benchmark.add('tpl-str-2-closure ', () => `${_a}${_b}`);

benchmark.add('str-add-3-argument', (a, b, c) => a + b + c, options);
benchmark.add('tpl-str-3-argument', (a, b, c) => `${a}${b}${c}`, options);
benchmark.add('str-add-3-closure ', () => _a + _b + _c);
benchmark.add('tpl-str-3-closure ', () => `${_a}${_b}${_c}`);

benchmark.add('str-add-4-argument', (a, b, c, d) => a + b + c + d, options);
benchmark.add('tpl-str-4-argument', (a, b, c, d) => `${a}${b}${c}${d}`, options);
benchmark.add('str-add-4-closure ', () => _a + _b + _c + _d);
benchmark.add('tpl-str-4-closure ', () => `${_a}${_b}${_c}${_d}`);

benchmark.add('str-add-5-argument', (a, b, c, d, e) => a + b + c + d + e, options);
benchmark.add('tpl-str-5-argument', (a, b, c, d, e) => `${a}${b}${c}${d}${e}`, options);
benchmark.add('str-add-5-closure ', () => _a + _b + _c + _d + _e);
benchmark.add('tpl-str-5-closure ', () => `${_a}${_b}${_c}${_d}${_e}`);

benchmark.run();
