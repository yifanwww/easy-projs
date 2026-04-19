import { describe, expect, it } from '@jest/globals';
import { assertIsBoolean, assertIsDefined, assertIsNever, assertIsNumber, assertIsString } from '../assert.js';

describe(`Test fn \`${assertIsBoolean.name}\``, () => {
    it('should assert a value is boolean', () => {
        expect(() => assertIsBoolean(true, 'bool')).not.toThrow();
        expect(() => assertIsBoolean(0, 'bool')).toThrow(new Error('`bool` should be boolean'));
    });
});

describe(`Test fn \`${assertIsNumber.name}\``, () => {
    it('should assert a value is number', () => {
        expect(() => assertIsNumber(0, 'num')).not.toThrow();
        expect(() => assertIsNumber('hello world', 'num')).toThrow(new Error('`num` should be number'));
    });
});

describe(`Test fn \`${assertIsString.name}\``, () => {
    it('should assert a value is string', () => {
        expect(() => assertIsString('hello world', 'str')).not.toThrow();
        expect(() => assertIsString(0, 'str')).toThrow(new Error('`str` should be string'));
    });
});

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow(
            new Error('The value should be `never`, but received "hello world"'),
        );
    });
});

describe(`Test fn \`${assertIsDefined.name}\``, () => {
    it('should throw an error if assertion failes', () => {
        let variable: unknown;

        variable = null;
        expect(() => assertIsDefined(variable)).toThrow(
            new Error('Expected `value` to be defined, but received `null`'),
        );

        variable = undefined;
        expect(() => assertIsDefined(variable, 'variable')).toThrow(
            new Error('Expected `variable` to be defined, but received `undefined`'),
        );
    });
});
