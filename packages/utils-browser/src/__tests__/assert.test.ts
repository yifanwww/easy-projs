import { describe, expect, it } from '@jest/globals';
import {
    AssertionError,
    assert,
    assertIsBoolean,
    assertIsDefined,
    assertIsNever,
    assertIsNumber,
    assertIsString,
} from '../assert.js';

describe(`Test fn \`${assert.name}\``, () => {
    it('should assert an expression', () => {
        expect(() => assert(true)).not.toThrow();
        expect(() => assert(false)).toThrow(new AssertionError('Assertion Error'));
        expect(() => assert(false, 'custom error message')).toThrow(new AssertionError('custom error message'));
    });
});

describe(`Test fn \`${assertIsBoolean.name}\``, () => {
    it('should assert a value is boolean', () => {
        expect(() => assertIsBoolean(true, 'bool')).not.toThrow();
        expect(() => assertIsBoolean(0, 'bool')).toThrow(new AssertionError('`bool` should be boolean'));
    });
});

describe(`Test fn \`${assertIsNumber.name}\``, () => {
    it('should assert a value is number', () => {
        expect(() => assertIsNumber(0, 'num')).not.toThrow();
        expect(() => assertIsNumber('hello world', 'num')).toThrow(new AssertionError('`num` should be number'));
    });
});

describe(`Test fn \`${assertIsString.name}\``, () => {
    it('should assert a value is string', () => {
        expect(() => assertIsString('hello world', 'str')).not.toThrow();
        expect(() => assertIsString(0, 'str')).toThrow(new AssertionError('`str` should be string'));
    });
});

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(
            new AssertionError('"hello world" should be `never` type'),
        );
    });
});

describe(`Test fn \`${assertIsDefined.name}\``, () => {
    it('should throw an error if assertion failes', () => {
        let variable: unknown;

        variable = null;
        expect(() => assertIsDefined(variable)).toThrow(
            new AssertionError('Expected `value` to be defined, but received `null`'),
        );

        variable = undefined;
        expect(() => assertIsDefined(variable, 'variable')).toThrow(
            new AssertionError('Expected `variable` to be defined, but received `undefined`'),
        );
    });
});
