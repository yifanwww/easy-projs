import produce, { Draft } from 'immer';
import { Dispatch, useMemo, useReducer } from 'react';

export type ImmerReducer<State extends {}, Action> = (state: Draft<State>, action: Action) => void;

export function useImmerReducer<State extends {}, Action, I>(
    reducer: ImmerReducer<State, Action>,
    initializerArg: State & I,
    initializer: (arg: State & I) => State,
): [State, Dispatch<Action>];

export function useImmerReducer<State extends {}, Action, I>(
    reducer: ImmerReducer<State, Action>,
    initializerArg: I,
    initializer: (arg: I) => State,
): [State, Dispatch<Action>];

export function useImmerReducer<State extends {}, Action>(
    reducer: ImmerReducer<State, Action>,
    initialState: State,
): [State, Dispatch<Action>];

export function useImmerReducer<State extends {}, Action, I>(
    reducer: ImmerReducer<State, Action>,
    initializerArg: State & I,
    initializer?: (arg: State & I) => State,
) {
    const cachedReducer = useMemo(() => produce(reducer), [reducer]);
    return useReducer(cachedReducer, initializerArg as never, initializer as never);
}
