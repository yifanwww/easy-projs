import { Benchmark, BenchmarkGroup, BenchmarkLoggerLevel } from '@easy/benchmark-js';

Benchmark.loggerLevel = BenchmarkLoggerLevel.Info;

function es5default(options?: string) {
    options || (options = 'hello world');
    return options;
}

function es6default(options: string = 'hello world') {
    return options;
}

es5default('');
es5default('hello');
es5default('world');
es6default('');
es6default('hello');
es6default('world');

const benchmark = new BenchmarkGroup();
benchmark.setEmptyTest();
benchmark.add('ES5#default', es5default);
benchmark.add('ES6#default', es6default);
benchmark.run();
