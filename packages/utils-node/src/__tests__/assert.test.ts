import { describe, expect, it } from '@jest/globals';
import { AssertionError } from 'node:assert';

import { assertIsDefined, assertIsNever } from '../assert.js';

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(AssertionError);
        expect(() => assertIsNever('hello world' as never)).toThrowErrorMatchingSnapshot();
    });
});

describe(`Test fn \`${assertIsDefined.name}\``, () => {
    it('should throw an error if assertion failes', () => {
        expect(() => assertIsDefined(null)).toThrow(AssertionError);
        expect(() => assertIsDefined(undefined)).toThrow(AssertionError);
        expect(() => assertIsDefined(null)).toThrowErrorMatchingSnapshot();
        expect(() => assertIsDefined(undefined)).toThrowErrorMatchingSnapshot();
    });
});
