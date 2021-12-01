# @easy/benchmark-javascript

A benchmark tool to test javascript performance.

## Usage
### `Benchmark`

```ts
import { Benchmark } from '../src';

/** Used to avoid some optimization */
let res;

const benchmark = new Benchmark('String#indexOf', () => {
    res = 'Hello World!'.indexOf('o') > -1;
});

res;

benchmark.run();

console.log(benchmark.toString());
```

## Develop this package

You need to build package `@easy/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

Execute `npm run build-dist` or `yarn build-dist` to build both source code and test code.
