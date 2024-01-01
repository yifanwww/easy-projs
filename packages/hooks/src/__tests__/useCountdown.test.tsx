import { validateHookValueNotChanged } from '@easy-pkg/utils-test';
import { jest } from '@jest/globals';
import { act, render } from '@testing-library/react';
import { useEffect } from 'react';

import { useCountdown } from '../useCountdown.js';

describe(`Test react hook \`${useCountdown.name}\``, () => {
    validateHookValueNotChanged('should return the same function', () => [useCountdown()[1]]);

    let dateTime = 0;
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
        dateTime = 0;
    });

    it('should rerender while counting down', () => {
        let renderCount = 0;

        function TestComponent() {
            const [, setCountdown] = useCountdown();
            useEffect(() => setCountdown(5), [setCountdown]);
            renderCount++;
            return <div />;
        }

        expect(renderCount).toBe(0);
        render(<TestComponent />);
        expect(renderCount).toBe(2);

        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(3);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(4);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(5);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(6);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(7);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(7);
    });

    it('should not rerender after unmount', () => {
        let renderCount = 0;

        function TestComponent() {
            const [, setCountdown] = useCountdown();
            useEffect(() => {
                setCountdown(5_000);
            }, [setCountdown]);
            renderCount++;
            return <div />;
        }

        expect(renderCount).toBe(0);
        const { unmount } = render(<TestComponent />);
        expect(renderCount).toBe(2);

        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(3);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(4);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(5);

        unmount();

        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(5);
        act(() => jest.advanceTimersByTime(1000));
        expect(renderCount).toBe(5);
    });
});
