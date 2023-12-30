/* eslint-disable @typescript-eslint/ban-types */

import type { UnknownFn } from '@easy-pkg/types/fn';
import type { ConditionalKeys } from 'type-fest';

export function buildMethodName<T extends Function>($class: T, method: ConditionalKeys<T['prototype'], UnknownFn>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return `${$class.name}.prototype.${($class.prototype[method] as Function).name}`;
}

export function buildStaticMethodName<T extends Function>($class: T, method: ConditionalKeys<T, UnknownFn>) {
    return `${$class.name}.${($class[method] as Function).name}`;
}

export function createClassJestHelper<T extends Function>($class: T) {
    return {
        buildMethodName: (method: ConditionalKeys<T['prototype'], UnknownFn>) => buildMethodName($class, method),
        buildStaticMethodName: (method: ConditionalKeys<T, UnknownFn>) => buildStaticMethodName($class, method),
    };
}
