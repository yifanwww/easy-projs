import type { UnknownFn } from '@easy-pkg/utils-type';
import { noop } from 'lodash';
import React from 'react';

export function withMockedHooks<T extends UnknownFn>(fn: T): T {
    const _fn = (...args: never[]) => {
        const _useCallback = React.useCallback;
        const _useContext = React.useContext;
        const _useDebugValue = React.useDebugValue;
        const _useEffect = React.useEffect;
        const _useImperativeHandle = React.useImperativeHandle;
        const _useLayoutEffect = React.useLayoutEffect;
        const _useMemo = React.useMemo;
        const _useReducer = React.useReducer;
        const _useRef = React.useRef;
        const _useState = React.useState;

        React.useCallback = (callback) => callback;
        // @ts-ignore
        React.useContext = (context) => context._currentValue;
        React.useDebugValue = noop;
        React.useEffect = noop;
        React.useImperativeHandle = noop;
        React.useLayoutEffect = noop;
        React.useMemo = (factory) => factory();
        React.useReducer = (_: unknown, arg1: unknown, arg2?: (args: unknown) => unknown): [unknown, () => void] => {
            return [arg2 ? arg2(arg1) : arg1, noop];
        };
        React.useRef = (initialValue?: unknown) => ({ current: initialValue });
        React.useState = (initialValue?: unknown) => [initialValue, noop];

        const res = fn(...args);

        React.useCallback = _useCallback;
        React.useContext = _useContext;
        React.useDebugValue = _useDebugValue;
        React.useEffect = _useEffect;
        React.useImperativeHandle = _useImperativeHandle;
        React.useLayoutEffect = _useLayoutEffect;
        React.useMemo = _useMemo;
        React.useReducer = _useReducer;
        React.useRef = _useRef;
        React.useState = _useState;

        return res;
    };

    return _fn as T;
}
