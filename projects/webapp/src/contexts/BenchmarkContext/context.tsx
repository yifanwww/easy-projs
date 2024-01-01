import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import { abstractFn } from '@easy-pkg/utils';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { benchmarkResultAdapter } from './adapters';
import { reducer } from './reducer';
import type { BenchmarkContextValue, BenchmarkUpdaterContextValue } from './types';

export const initialState: BenchmarkContextValue = {
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

export const BenchmarkContext = createContext<BenchmarkContextValue>(initialState);

export const BenchmarkUpdaterContext = createContext<BenchmarkUpdaterContextValue>({
    add: abstractFn,
    clear: abstractFn,
    clearAll: abstractFn,
});

export function BenchmarkProvider({ children }: ReactChildrenProps): React.ReactNode {
    const [context, dispatch] = useImmerReducer(reducer, initialState);

    const updaters = useMemo<BenchmarkUpdaterContextValue>(
        () => ({
            add: (result) => dispatch({ type: 'add', result }),
            clear: (benchmarkType, componentName) => dispatch({ type: 'clear', benchmarkType, componentName }),
            clearAll: () => dispatch({ type: 'clear-all' }),
        }),
        [dispatch],
    );

    return (
        <BenchmarkUpdaterContext.Provider value={updaters}>
            <BenchmarkContext.Provider value={context}>{children}</BenchmarkContext.Provider>
        </BenchmarkUpdaterContext.Provider>
    );
}