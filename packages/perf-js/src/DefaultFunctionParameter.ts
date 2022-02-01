import { Benchmark } from '@easy/benchmark-js';

function es5default(options?: string) {
    options || (options = 'hello world');
    return options;
}

function es6default(options: string = 'hello world') {
    return options;
}

const benchmark = new Benchmark();
benchmark.setEmptyTest();
benchmark.add('ES5#default', es5default, {
    args: [['str']],
    preArgs: [[undefined]],
});
benchmark.add('ES6#default', es6default, {
    args: [['str']],
    preArgs: [[undefined]],
});
benchmark.run();
