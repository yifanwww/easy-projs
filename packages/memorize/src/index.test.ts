import { expectSnapshot } from '@easy/utils-test';

import * as package_exports from './index';

it('exports from this package', () => expectSnapshot(Object.keys(package_exports)));

describe('Test function `memorize`', () => {
    it('works with default diff', () => {
        const test = jest.fn((...args: unknown[]) => args);

        const memoTest = package_exports.memorize(test);

        expect(test).toBeCalledTimes(0);
        memoTest();
        expect(test).toBeCalledTimes(1);
        memoTest(0);
        expect(test).toBeCalledTimes(2);
        memoTest(0);
        expect(test).toBeCalledTimes(2);
        const res1 = memoTest(1);
        expect(test).toBeCalledTimes(3);
        const res2 = memoTest(1);
        expect(test).toBeCalledTimes(3);

        expect(res1).toBe(res2);
    });

    it('works with custom diff', () => {
        const test = jest.fn((...args: unknown[]) => args);

        const memoTest = package_exports.memorize(test, (prev, curr) => prev.length !== curr.length);

        expect(test).toBeCalledTimes(0);
        memoTest();
        expect(test).toBeCalledTimes(1);
        memoTest(0);
        expect(test).toBeCalledTimes(2);
        memoTest(1);
        expect(test).toBeCalledTimes(2);
        const res1 = memoTest(0, 1);
        expect(test).toBeCalledTimes(3);
        const res2 = memoTest(5, 10);
        expect(test).toBeCalledTimes(3);

        expect(res1).toBe(res2);
    });
});
