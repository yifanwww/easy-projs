import { BenchmarkGroup } from '@easy/benchmark-js';

const benchmark = new BenchmarkGroup();

benchmark.add('RegExp#test', () => {
    /o/.test('Hello World!');
});

benchmark.run();
