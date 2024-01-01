import { validateHookValueNotChanged } from '@easy-pkg/utils-test';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { createRef, forwardRef, useImperativeHandle } from 'react';

import { useSingleTimeout } from '../useSingleTimeout.js';

describe(`Test react hook \`${useSingleTimeout.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => {
        const { setTimeout, clearTimeout } = useSingleTimeout();
        return [setTimeout, clearTimeout];
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

    const TestComponent = forwardRef((props: unknown, ref: React.Ref<{ clearTimeout: () => void }>) => {
        const { setTimeout, clearTimeout } = useSingleTimeout();

        useImperativeHandle(ref, () => ({ clearTimeout }), [clearTimeout]);

        setTimeout(() => {
            timesCalled++;
        }, 0);

        return <div />;
    });

    it('should update value when mounted', () => {
        render(<TestComponent />);
        expect(timesCalled).toBe(0);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(1);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(1);
    });

    it('should not execute the timeout when unmounted', () => {
        const { unmount } = render(<TestComponent />);
        expect(timesCalled).toBe(0);

        unmount();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(0);
    });

    it('should cancel timeout', () => {
        const ref = createRef<{ clearTimeout: () => void }>();
        render(<TestComponent ref={ref} />);

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(1);

        ref.current?.clearTimeout();

        jest.runOnlyPendingTimers();
        expect(timesCalled).toBe(1);
    });
});
