import type { UnknownFn } from '@easy-pkg/utils-type';

export function abstractFn(): never {
    throw new Error('Not Implemented');
}

export function abstractAsyncFn(): Promise<never> {
    return Promise.reject(new Error('Not Implemented'));
}

/**
 * Convert an async function to a sync function by dropping the returned Promise.
 *
 * This is useful for bypassing ESLing rule `@typescript-eslint/no-misused-promises` in some cases
 * when we want to pass an async function to a receiver that expects a functionwith return type `void`.
 *
 * **WARNING**: Please ensure it's safe to drop the returned Promise if you want to use this function.
 */
export function noAsync<T extends (...args: never[]) => unknown>(fn: T): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => void fn(...args);
}

export function makeFn<T extends UnknownFn>(fn: T): T {
    return fn;
}
