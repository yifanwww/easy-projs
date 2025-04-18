import { afterAll, afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { createRef, forwardRef, useImperativeHandle, useRef } from 'react';

import { useIntervals } from '../useIntervals.js';

import { validateHookValueNotChanged } from './helpers.js';

const time = 10;

describe(`Test react hook \`${useIntervals.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => {
        const { setInterval, clearInterval } = useIntervals();
        return [setInterval, clearInterval];
    });

    // Initialization
    let timesCalled = 0;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        timesCalled = 0;
    });

    const TestComponent = forwardRef((props: unknown, ref: React.Ref<{ clearInterval: () => void }>) => {
        const { setInterval, clearInterval } = useIntervals();
        const { current: state } = useRef<{ id: number }>({ id: 0 });

        useImperativeHandle(
            ref,
            () => ({
                clearInterval: () => clearInterval(state.id),
            }),
            [clearInterval, state],
        );

        state.id = setInterval(() => {
            timesCalled++;
        }, time);

        return <div />;
    });

    it('should update value when mounted', () => {
        render(<TestComponent />);
        expect(timesCalled).toBe(0);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toBe(1);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toBe(2);
    });

    it('should not execute the interval when unmounted', () => {
        const { unmount } = render(<TestComponent />);
        expect(timesCalled).toBe(0);

        unmount();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(0);
    });

    it('should cancel intervals', () => {
        const ref = createRef<{ clearInterval: () => void }>();
        render(<TestComponent ref={ref} />);

        jest.advanceTimersByTime(time);
        expect(timesCalled).toBe(1);

        ref.current?.clearInterval();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(1);
    });
});
