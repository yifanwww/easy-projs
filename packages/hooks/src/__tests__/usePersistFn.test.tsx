import { assert } from '@easy-pkg/utils-browser';
import { describe, expect, it } from '@jest/globals';
import { act, render, renderHook } from '@testing-library/react';
import { useState } from 'react';

import { usePersistFn } from '../usePersistFn.js';

import { validateHookValueNotChanged } from './helpers.js';

describe(`Test react hook \`${usePersistFn.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => [usePersistFn(() => {})]);

    it('should call the latest non-persist function #1', () => {
        let countRef: number | undefined;
        let increaseCount = null as (() => void) | null;
        expect(countRef).toBeUndefined();
        expect(increaseCount).toBeNull();

        function TestComponent() {
            const [count, setCount] = useState(0);
            countRef = count;
            increaseCount = usePersistFn(() => setCount(count + 1));
            return <div />;
        }

        render(<TestComponent />);
        expect(countRef).toBe(0);
        expect(increaseCount).toBeInstanceOf(Function);
        assert(typeof increaseCount === 'function');

        for (let i = 1; i <= 10; i++) {
            const increaseCountRef = increaseCount;
            act(() => increaseCountRef());
            expect(countRef).toBe(i);
        }
    });

    it('should call the latest non-persist function #2', () => {
        function useCount() {
            const [count, setCount] = useState(0);

            return {
                increaseCount: () => setCount((prev) => prev + 1),
                getCount: usePersistFn(() => count),
            };
        }

        const hook = renderHook(useCount);
        expect(hook.result.current.getCount()).toBe(0);

        act(() => {
            hook.result.current.increaseCount();
        });
        expect(hook.result.current.getCount()).toBe(1);
    });
});
