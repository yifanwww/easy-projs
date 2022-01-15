import { BenchmarkGroup } from '@easy/benchmark-js';

const benchmark = new BenchmarkGroup();

benchmark.add('ES5#default', (options?: Record<string, unknown>) => {
    options || (options = {});
});

benchmark.add('ES6#default', (options: Record<string, unknown> = {}) => {
    options;
});

benchmark.run();
