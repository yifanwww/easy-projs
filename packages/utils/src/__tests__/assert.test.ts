import { assert, assertIsBoolean, assertIsNever, assertIsNumber, assertIsString } from '../assert';

describe(`Test fn \`${assert.name}\``, () => {
    it('should assert an expression', () => {
        const str = 'hello world';

        expect(() => assert(typeof str === 'string')).not.toThrow();
        expect(() => assert(typeof str === 'number')).toThrow();
    });
});

describe(`Test fn \`${assertIsBoolean.name}\``, () => {
    it('should assert a value is boolean', () => {
        const bool = true;
        const num = 0;

        expect(() => assertIsBoolean(bool, 'bool')).not.toThrow();
        expect(() => assertIsBoolean(num, 'num')).toThrow();
    });
});

describe(`Test fn \`${assertIsNumber.name}\``, () => {
    it('should assert a value is number', () => {
        const num = 0;
        const str = 'hello world';

        expect(() => assertIsNumber(num, 'num')).not.toThrow();
        expect(() => assertIsNumber(str, 'str')).toThrow();
    });
});

describe(`Test fn \`${assertIsString.name}\``, () => {
    it('should assert a value is string', () => {
        const str = 'hello world';
        const num = 0;

        expect(() => assertIsString(str, 'str')).not.toThrow();
        expect(() => assertIsString(num, 'num')).toThrow();
    });
});

describe(`Test fn \`${assertIsNever.name}\``, () => {
    it('should throw an error', () => {
        expect(() => assertIsNever('hello world' as never)).toThrow();
    });
});
