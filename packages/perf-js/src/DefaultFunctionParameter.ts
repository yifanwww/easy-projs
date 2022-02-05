import { Arguments, Benchmark } from 'benchmark-node';

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
    args: new Arguments('str'),
    jitArgs: new Arguments(undefined),
});
benchmark.add('ES6#default', es6default, {
    args: new Arguments('str'),
    jitArgs: new Arguments(undefined),
});
benchmark.run();
