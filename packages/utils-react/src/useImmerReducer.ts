import produce from 'immer';
import type { Draft, nothing } from 'immer';
import { useMemo, useReducer } from 'react';
import type { Dispatch } from 'react';

export type ImmerReducer<S, A> = (draftState: Draft<S>, action: A) => void | (S extends undefined ? typeof nothing : S);

export function useImmerReducer<S, A, I>(
    reducer: ImmerReducer<S, A>,
    initializerArg: S & I,
    initializer: (arg: S & I) => S,
): [S, Dispatch<A>];

export function useImmerReducer<S, A, I>(
    reducer: ImmerReducer<S, A>,
    initializerArg: I,
    initializer: (arg: I) => S,
): [S, Dispatch<A>];

export function useImmerReducer<S, A>(
    reducer: ImmerReducer<S, A>,
    initialState: S,
    initializer?: undefined,
): [S, Dispatch<A>];

export function useImmerReducer<S, A, I>(
    reducer: ImmerReducer<S, A>,
    initializerArg: S & I,
    initializer?: (arg: S & I) => S,
) {
    const cachedReducer = useMemo(() => produce(reducer), [reducer]);
    return useReducer(cachedReducer, initializerArg as never, initializer as never);
}
