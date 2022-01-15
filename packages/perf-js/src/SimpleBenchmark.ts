export {};

let num = 0;
function benchmark(count: number, testFn: () => void) {
    const begin = process.hrtime();
    for (let i = 0; i < count; i++) {
        testFn();
    }
    const duration = process.hrtime(begin);
    console.log(++num, duration);
}

const count = 1e8;
const noop = () => {};
benchmark(count, noop);
benchmark(count, noop);
benchmark(count, noop);
benchmark(count, () => {});
benchmark(count, noop);
benchmark(count, () => {});
benchmark(count, noop);
benchmark(count, () => {});
benchmark(count, () => {});
