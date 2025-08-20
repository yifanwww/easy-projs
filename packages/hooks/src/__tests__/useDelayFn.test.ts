import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useDelayFn } from '../useDelayFn.js';

import { validateHookValueNotChanged } from './helpers.js';

const noop = () => {};

describe(`Test react hook \`${useDelayFn.name}\``, () => {
    validateHookValueNotChanged('should return the same function', () => [useDelayFn(noop)]);

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should trigger only once', () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should trigger multiple times', () => {
        const fn = jest.fn(() => {});
        const { result } = renderHook(() => useDelayFn(fn, 500));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(250);
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should work with no delay function', () => {
        expect(() => {
            const { result } = renderHook(() => useDelayFn());
            act(() => result.current());
        }).not.toThrow();
    });

    it('should not execute fn after unmount', () => {
        const fn = jest.fn(() => {});
        const { result, unmount } = renderHook(() => useDelayFn(fn, 500));

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(250);
        unmount();
        jest.advanceTimersByTime(250);

        expect(fn).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(0);
    });
});
