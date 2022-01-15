import { BenchmarkGroup } from '@easy/benchmark-js';

const benchmark = new BenchmarkGroup();

// let origin: string;
// let target: string;
const origin = 'Hello World!';
const target = 'o';

benchmark.add('String#indexOf-arg', () => {
    origin.indexOf(target) > -1;
});

benchmark.add('String#indexOf', () => {
    'Hello World!'.indexOf('o') > -1;
});

benchmark.run();
