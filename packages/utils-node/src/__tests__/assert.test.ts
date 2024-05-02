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
        let variable: unknown;

        variable = null;
        expect(() => assertIsDefined(variable)).toThrow(AssertionError);
        expect(() => assertIsDefined(variable)).toThrowErrorMatchingSnapshot();

        variable = undefined;
        expect(() => assertIsDefined(variable, 'variable')).toThrow(AssertionError);
        expect(() => assertIsDefined(variable, 'variable')).toThrowErrorMatchingSnapshot();
    });
});
