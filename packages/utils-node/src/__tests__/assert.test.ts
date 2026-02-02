import { AssertionError } from 'node:assert';
import { describe, expect, it } from '@jest/globals';
import { assertIsDefined, assertIsNever } from '../assert.js';

function getThrowedError(fn: () => void) {
    let err: AssertionError;
    try {
        fn();
    } catch (error) {
        err = error as AssertionError;
    }
    expect(err!).toBeDefined();
    return err!;
}

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(
            new AssertionError({ message: '"hello world" should be `never` type' }),
        );
        expect(getThrowedError(() => assertIsNever('hello world' as never)).actual).toBe('hello world');
    });
});

describe(`Test fn \`${assertIsDefined.name}\``, () => {
    it('should throw an error if assertion failes', () => {
        let variable: unknown;

        variable = null;
        expect(() => assertIsDefined(variable)).toThrow(
            new AssertionError({ message: 'Expected `value` to be defined, but received `null`' }),
        );
        expect(getThrowedError(() => assertIsDefined(variable)).actual).toBeNull();

        variable = undefined;
        expect(() => assertIsDefined(variable, 'variable')).toThrow(
            new AssertionError({ message: 'Expected `variable` to be defined, but received `undefined`' }),
        );
        expect(getThrowedError(() => assertIsDefined(variable, 'variable')).actual).toBeUndefined();
    });
});
