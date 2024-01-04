import { describe, expect, it, jest } from '@jest/globals';

import { ArrayUtil } from '../array.js';

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.filterFalsy.name}\``, () => {
    it('should filter falsy values', () => {
        expect(ArrayUtil.filterFalsy([])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([undefined])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([null])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([false])).toStrictEqual([]);
        expect(ArrayUtil.filterFalsy([{ a: 'asdf' }, { b: 'qwer' }, {}, undefined, null, false])).toStrictEqual([
            { a: 'asdf' },
            { b: 'qwer' },
            {},
        ]);
    });
});

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.includes.name}\``, () => {
    it('should check if array includes search element', () => {
        const spy = jest.spyOn(Array.prototype, 'includes');

        expect(spy).toHaveBeenCalledTimes(0);

        expect(ArrayUtil.includes([], undefined)).toBe(false);
        expect(ArrayUtil.includes([], null)).toBe(false);
        expect(ArrayUtil.includes([undefined, null], undefined)).toBe(true);
        expect(ArrayUtil.includes([undefined, null], null)).toBe(true);

        expect(spy).toHaveBeenCalledTimes(4);
    });
});

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.equal.name}\``, () => {
    it('should return true if an array equals to another array', () => {
        expect(ArrayUtil.equal([], [])).toBe(true);
        expect(ArrayUtil.equal([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(ArrayUtil.equal(['hello', 'world'], ['hello', 'world'])).toBe(true);
    });

    it('should return false if an array does not equal to another array', () => {
        expect(ArrayUtil.equal([1], [2, 3])).toBe(false);
        expect(ArrayUtil.equal([1, 2], [2, 3])).toBe(false);
        expect(ArrayUtil.equal(['hello', 'world'], ['hello', 'javascript'])).toBe(false);
    });
});
