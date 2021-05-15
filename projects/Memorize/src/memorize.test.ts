import { memorize } from './memorize.js';

const test = memorize(function test(a: number, b: number) {
    return `${a} + ${b} = ${a + b}`;
});

console.log(test(1, 2));
console.log(test(1, 2));
console.log(test(2, 2));
console.log(test(3, 2));
console.log(test(3, 2));
console.log(test(3, 2));
console.log(test(4, 2));
console.log(test(4, 2));
