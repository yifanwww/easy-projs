import { Arguments, BenchmarkJob } from 'benchmark-node';

function es5default(options?: string) {
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/prefer-nullish-coalescing
    options || (options = 'hello world');
    return options;
}

function es6default(options = 'hello world') {
    return options;
}

const job = new BenchmarkJob();
job.add('ES5#default', es5default, {
    args: new Arguments('str'),
    jitArgs: new Arguments(undefined),
});
job.add('ES6#default', es6default, {
    args: new Arguments('str'),
    jitArgs: new Arguments(undefined),
});
job.run();
