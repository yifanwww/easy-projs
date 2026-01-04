import { Bench, hrtimeNow } from 'tinybench';

import { formatTinybenchTask } from '../tinybench.js';
import { formatNum, logEnvironment } from '../utils.js';

logEnvironment();

const N = 100_000;
console.log('Loop N:', formatNum(N));

function addStr2(a: string, b: string): string {
    return a + b;
}

function addStr3(a: string, b: string, c: string): string {
    return a + b + c;
}

function addStr4(a: string, b: string, c: string, d: string): string {
    return a + b + c + d;
}

function addStr5(a: string, b: string, c: string, d: string, e: string): string {
    return a + b + c + d + e;
}

function tplStr2(a: string, b: string): string {
    return `${a}${b}`;
}

function tplStr3(a: string, b: string, c: string): string {
    return `${a}${b}${c}`;
}

function tplStr4(a: string, b: string, c: string, d: string): string {
    return `${a}${b}${c}${d}`;
}

function tplStr5(a: string, b: string, c: string, d: string, e: string): string {
    return `${a}${b}${c}${d}${e}`;
}

const bench = new Bench({ now: hrtimeNow });
bench
    .add('addStr2', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = addStr2(value, 'str1');
            value = addStr2(value, 'str2');
            value = addStr2(value, 'str3');
        }
        return value;
    })
    .add('tplStr2', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = tplStr2(value, 'str1');
            value = tplStr2(value, 'str2');
            value = tplStr2(value, 'str3');
        }
        return value;
    })
    .add('addStr3', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = addStr3(value, 'str1', 'str2');
            value = addStr3(value, 'str3', 'str4');
            value = addStr3(value, 'str5', 'str6');
        }
        return value;
    })
    .add('tplStr3', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = tplStr3(value, 'str1', 'str2');
            value = tplStr3(value, 'str3', 'str4');
            value = tplStr3(value, 'str5', 'str6');
        }
        return value;
    })
    .add('addStr4', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = addStr4(value, 'str1', 'str2', 'str3');
            value = addStr4(value, 'str4', 'str5', 'str6');
            value = addStr4(value, 'str7', 'str8', 'str9');
        }
        return value;
    })
    .add('tplStr4', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = tplStr4(value, 'str1', 'str2', 'str3');
            value = tplStr4(value, 'str4', 'str5', 'str6');
            value = tplStr4(value, 'str7', 'str8', 'str9');
        }
        return value;
    })
    .add('addStr5', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = addStr5(value, 'str1', 'str2', 'str3', 'str4');
            value = addStr5(value, 'str5', 'str6', 'str7', 'str8');
            value = addStr5(value, 'str9', 'str10', 'str11', 'str12');
        }
        return value;
    })
    .add('tplStr5', () => {
        let value = 'str';
        for (let i = 0; i < N; i++) {
            value = tplStr5(value, 'str1', 'str2', 'str3', 'str4');
            value = tplStr5(value, 'str5', 'str6', 'str7', 'str8');
            value = tplStr5(value, 'str9', 'str10', 'str11', 'str12');
        }
        return value;
    });
await bench.run();

console.table(bench.table(formatTinybenchTask));
