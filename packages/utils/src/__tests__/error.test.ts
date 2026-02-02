import { describe, expect, it } from '@jest/globals';
import { toError } from '../error.js';

describe(`Test fn \`${toError.name}\``, () => {
    it('should use the original error', () => {
        const error = new Error(Error.name);
        const evalError = new EvalError(EvalError.name);
        const rangeError = new RangeError(RangeError.name);
        const referenceError = new ReferenceError(ReferenceError.name);
        const syntaxError = new SyntaxError(SyntaxError.name);
        const typeError = new TypeError(TypeError.name);
        const uriError = new URIError(URIError.name);
        const aggregateError = new AggregateError(AggregateError.name);

        expect(toError(error)).toBe(error);
        expect(toError(evalError)).toBe(evalError);
        expect(toError(rangeError)).toBe(rangeError);
        expect(toError(referenceError)).toBe(referenceError);
        expect(toError(syntaxError)).toBe(syntaxError);
        expect(toError(typeError)).toBe(typeError);
        expect(toError(uriError)).toBe(uriError);
        expect(toError(aggregateError)).toBe(aggregateError);
    });

    it('should wrap the error into a new Error instance', () => {
        expect(toError(undefined)).toBeInstanceOf(Error);
        expect(toError(null)).toBeInstanceOf(Error);
        expect(toError(0)).toBeInstanceOf(Error);
        expect(toError(0n)).toBeInstanceOf(Error);
        expect(toError(false)).toBeInstanceOf(Error);
        expect(toError('Error')).toBeInstanceOf(Error);
        expect(toError({ message: 'Error' })).toBeInstanceOf(Error);
        expect(toError([{ message: 'Error' }])).toBeInstanceOf(Error);
        expect(toError(Symbol('Error'))).toBeInstanceOf(Error);
    });
});
