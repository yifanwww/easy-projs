/// <reference types="react-scripts" />

import { CSSProperties, ReactNode } from 'react';

declare global {
    /**
     * TypeScript type to return a deep partial object (each property can be undefined, recursively).
     */
    // prettier-ignore
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends (infer U)[]
            ? DeepPartial<U>[]
            : T[P] extends (...args: never[]) => unknown
                ? T[P]
                : T[P] extends object
                    ? DeepPartial<T[P]>
                    : T[P];
    };

    type Primitive = string | number | boolean | bigint | symbol | undefined | null;
    type Builtin = Primitive | Function | Date | Error | RegExp;

    /**
     * TypeScript type to return a deep readonly object (recursively).
     */
    // prettier-ignore
    type DeepReadonly<T> = T extends Builtin
        ? T
        : T extends Map<infer K, infer V>
            ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
            : T extends ReadonlyMap<infer K, infer V>
                ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
                : T extends WeakMap<infer K, infer V>
                    ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
                    : T extends Set<infer U>
                        ? ReadonlySet<DeepReadonly<U>>
                        : T extends ReadonlySet<infer U>
                            ? ReadonlySet<DeepReadonly<U>>
                            : T extends WeakSet<infer U>
                                ? WeakSet<DeepReadonly<U>>
                                : T extends Promise<infer U>
                                    ? Promise<DeepReadonly<U>>
                                    : T extends (infer U)[]
                                        ? DeepReadonly<U>[]
                                        : T extends {}
                                            ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
                                            : Readonly<T>

    /**
     * T must contains all the properties of U.
     *
     * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
     */
    type Contain<T, U> = keyof U extends keyof T ? T : never;

    /**
     * The properties of T must be contained in U.
     *
     * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
     */
    type Contained<T, U> = keyof T extends keyof U ? T : never;

    type Optional<T> = T | null;

    type ExcludeFunction<T> = Exclude<T, Function>;
    type ExtractFunction<T> = Extract<T, Function>;

    /**
     * Obtain the static methods of a class.
     */
    type ClassStaticMethods<T extends abstract new (...args: unknown[]) => unknown> = Exclude<keyof T, 'prototype'>;

    type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => CSSProperties;

    interface IReactChildrenProp {
        children?: ReactNode;
    }

    interface IClientAreaSize {
        width: number;
        height: number;
    }

    interface IElementSize {
        width: number;
        height: number;
    }

    interface IElementPositionSize {
        left: number;
        top: number;
        width: number;
        height: number;
    }
}
