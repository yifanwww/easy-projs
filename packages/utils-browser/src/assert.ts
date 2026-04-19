import { assert } from 'es-toolkit';

export function assertIsString(value: unknown, varName: string): asserts value is string {
    assert(typeof value === 'string', `\`${varName}\` should be string`);
}

export function assertIsNumber(value: unknown, varName: string): asserts value is number {
    assert(typeof value === 'number', `\`${varName}\` should be number`);
}

export function assertIsBoolean(value: unknown, varName: string): asserts value is boolean {
    assert(typeof value === 'boolean', `\`${varName}\` should be boolean`);
}

/**
 * The function for asserting whether a value's type is `never`.
 */
export function assertIsNever(value: never): never {
    throw new Error(`The value should be \`never\`, but received "${String(value)}"`);
}

/**
 * The function for asserting whether a value is defined (!== `undefined` && !== `null`).
 */
export function assertIsDefined<T>(value: T, varName = 'value'): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`Expected \`${varName}\` to be defined, but received \`${value as null | undefined}\``);
    }
}
