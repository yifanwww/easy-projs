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

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.startsWith.name}\``, () => {
    it('should return true if an array starts with another array', () => {
        expect(ArrayUtil.startsWith([], [])).toBe(true);

        expect(ArrayUtil.startsWith([1, 2, 3], [])).toBe(true);
        expect(ArrayUtil.startsWith([1, 2, 3], [1, 2])).toBe(true);
        expect(ArrayUtil.startsWith([1, 2, 3], [1, 2, 3])).toBe(true);

        expect(ArrayUtil.startsWith(['hello', 'world'], ['hello'])).toBe(true);
        expect(ArrayUtil.startsWith(['hello', 'world'], ['hello', 'world'])).toBe(true);
    });

    it("should return false if an array doesn't start with another array", () => {
        expect(ArrayUtil.startsWith([], [1])).toBe(false);

        expect(ArrayUtil.startsWith([1], [1, 2])).toBe(false);
        expect(ArrayUtil.startsWith([1], [2, 3])).toBe(false);
        expect(ArrayUtil.startsWith([1, 2], [2, 3])).toBe(false);

        expect(ArrayUtil.startsWith(['hello', 'world'], ['helloo'])).toBe(false);
        expect(ArrayUtil.startsWith(['hello', 'world'], ['world'])).toBe(false);
        expect(ArrayUtil.startsWith(['hello', 'world'], ['hello', 'javascript'])).toBe(false);
    });
});

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.avoidEmpty.name}\``, () => {
    it('should avoid empty arrays', () => {
        expect(ArrayUtil.avoidEmpty(undefined)).toBeUndefined();
        expect(ArrayUtil.avoidEmpty([])).toBeUndefined();
        expect(ArrayUtil.avoidEmpty([1])).toStrictEqual([1]);
    });
});

describe(`Test static method \`${ArrayUtil.name}.${ArrayUtil.toArray.name}\``, () => {
    it('should avoid empty arrays', () => {
        expect(ArrayUtil.toArray(undefined)).toStrictEqual([]);
        expect(ArrayUtil.toArray(true)).toStrictEqual([true]);
        expect(ArrayUtil.toArray(false)).toStrictEqual([false]);
        expect(ArrayUtil.toArray('')).toStrictEqual(['']);
        expect(ArrayUtil.toArray(0)).toStrictEqual([0]);
        expect(ArrayUtil.toArray([])).toStrictEqual([]);
        expect(ArrayUtil.toArray(['value'])).toStrictEqual(['value']);
    });
});
