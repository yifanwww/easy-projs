import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { createRef } from 'react';

import { useCompositeRef } from '../useCompositeRef.js';

import { validateHookValueNotChanged } from './helpers.js';

describe(`Test react hook \`${useCompositeRef.name}\``, () => {
    {
        const refObject = createRef<boolean>();
        const refFn = () => {};
        validateHookValueNotChanged('should return the same ref (refs should be immutable)', () => [
            useCompositeRef<boolean>(refObject, refFn),
        ]);
    }

    it('should mutate the ref when 1 or more provided refs mutate', () => {
        const { rerender, result } = renderHook(() => useCompositeRef(() => {}));
        const firstValues = result.current;

        rerender();
        const secondValues = result.current;

        expect(firstValues).not.toBe(secondValues);
    });

    it('should update all provided refs', () => {
        const refObject = createRef<boolean>();
        let refValue: boolean | null = null;

        const { result } = renderHook(() =>
            useCompositeRef<boolean>(refObject, (val) => {
                refValue = val;
            }),
        );
        act(() => {
            result.current(true);
        });
        expect(refObject.current).toBe(true);
        expect(refValue).toBe(true);
    });

    it('should update the `.current` property', () => {
        const { result } = renderHook(() => useCompositeRef<string>());
        expect(result.current.current).toBeNull();
        act(() => {
            result.current('hello world');
        });
        expect(result.current.current).toBe('hello world');
        act(() => {
            result.current(null);
        });
        expect(result.current.current).toBeNull();
    });

    it('should handle changing ref callbacks', () => {
        const refObject = createRef<boolean>();

        let firstRefValue: boolean | null = null;
        let secondRefValue: boolean | null = null;

        const { rerender, result } = renderHook(
            (refFn: (value: boolean) => void) => useCompositeRef<boolean>(refObject, refFn),
            {
                initialProps: (value) => {
                    firstRefValue = value;
                },
            },
        );
        act(() => {
            result.current(true);
        });
        rerender((value) => {
            secondRefValue = value;
        });
        act(() => {
            result.current(true);
        });

        expect(firstRefValue).toBe(true);
        expect(secondRefValue).toBe(true);
    });
});
