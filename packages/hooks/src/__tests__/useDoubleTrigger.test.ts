import { noop } from '@easy-pkg/utils';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useDoubleTrigger } from '../useDoubleTrigger.js';

import { validateHookValueNotChanged } from './helpers.js';

describe(`Test react hook \`${useDoubleTrigger.name}\``, () => {
    validateHookValueNotChanged('should return the same function', () => [useDoubleTrigger(noop)]);

    let dateTime = 1_000;
    let intervalId: number;

    beforeAll(() => {
        jest.useFakeTimers();

        intervalId = window.setInterval(() => {
            dateTime++;
        }, 1);
    });

    afterAll(() => {
        jest.useRealTimers();

        clearInterval(intervalId);
    });

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => dateTime);
    });

    afterEach(() => {
        dateTime = 1_000;
    });

    it('should trigger only once', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDoubleTrigger(fn, 100));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);
    });

    it('should trigger multiple times', () => {
        const fn = jest.fn(noop);
        const { result } = renderHook(() => useDoubleTrigger(fn, 250));
        expect(fn).toHaveBeenCalledTimes(0);

        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(50);
        act(() => result.current());
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should work with no function', () => {
        expect(() => {
            const { result } = renderHook(() => useDoubleTrigger());
            act(() => result.current());
        }).not.toThrow();
    });
});
