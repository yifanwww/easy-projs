import { abstractFn } from '@easy-pkg/utils';
import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { benchmarkResultAdapter } from './adapters';
import { reducer } from './reducer';
import type { BenchmarkContextState, BenchmarkContextUpdaters } from './types';

export const initialState: BenchmarkContextState = {
    mount: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    unmount: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    update: {
        average: { noHooks: 0, useCallback: 0, useMemo: 0, useReducer: 0, useRef: 0, useState: 0 },
        noHooks: benchmarkResultAdapter.getInitialState(),
        useCallback: benchmarkResultAdapter.getInitialState(),
        useMemo: benchmarkResultAdapter.getInitialState(),
        useReducer: benchmarkResultAdapter.getInitialState(),
        useRef: benchmarkResultAdapter.getInitialState(),
        useState: benchmarkResultAdapter.getInitialState(),
    },
    totalResults: benchmarkResultAdapter.getInitialState(),
};

export const BenchmarkContext = createContext<BenchmarkContextState>(initialState);

export const BenchmarkContextUpdater = createContext<BenchmarkContextUpdaters>({
    add: abstractFn,
    clear: abstractFn,
    clearAll: abstractFn,
});

export function BenchmarkProvider({ children }: ReactChildrenProps): JSX.Element {
    const [context, dispatch] = useImmerReducer(reducer, initialState);

    const updaters = useMemo<BenchmarkContextUpdaters>(
        () => ({
            add: (result) => dispatch({ type: 'add', result }),
            clear: (benchmarkType, componentName) => dispatch({ type: 'clear', benchmarkType, componentName }),
            clearAll: () => dispatch({ type: 'clear-all' }),
        }),
        [dispatch],
    );

    return (
        <BenchmarkContextUpdater.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{children}</BenchmarkContext.Provider>
        </BenchmarkContextUpdater.Provider>
    );
}
