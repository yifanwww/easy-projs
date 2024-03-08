import { describe, expect, it } from '@jest/globals';

import { StringUtil } from '../string.js';

describe(`Test static method \`${StringUtil.name}.${StringUtil.isNilOrEmpty.name}\``, () => {
    it('should return true when checks null or undefined', () => {
        expect(StringUtil.isNilOrEmpty(null)).toBe(true);
        expect(StringUtil.isNilOrEmpty(undefined)).toBe(true);
    });

    it('should return true when checks an empty string', () => {
        expect(StringUtil.isNilOrEmpty('')).toBe(true);
    });

    it('should return false when checks a string which is not empty', () => {
        expect(StringUtil.isNilOrEmpty('a')).toBe(false);
        expect(StringUtil.isNilOrEmpty('abcd')).toBe(false);
    });
});

describe(`Test static method \`${StringUtil.name}.${StringUtil.startsWithOneOf.name}\``, () => {
    it('should check if a value starts with one of search strings', () => {
        expect(StringUtil.startsWithOneOf('hello world', [])).toBe(false);
        expect(StringUtil.startsWithOneOf('hello world', ['hello'])).toBe(true);
        expect(StringUtil.startsWithOneOf('hello world', ['world'])).toBe(false);
        expect(StringUtil.startsWithOneOf('hello world', ['hello', 'world'])).toBe(true);
        expect(StringUtil.startsWithOneOf('hello world', ['hello', 'world'], 2)).toBe(false);
        expect(StringUtil.startsWithOneOf('hello world', ['hello', 'world', 'llo'], 2)).toBe(true);
    });
});
