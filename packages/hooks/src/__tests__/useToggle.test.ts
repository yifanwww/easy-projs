import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useToggle } from '../useToggle.js';

import { validateHookValueNotChanged } from './helpers.js';

describe(`Test react hook \`${useToggle.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => {
        const [, { setLeft, setRight, toggle }] = useToggle();
        return [setLeft, setRight, toggle];
    });

    function useToggleWrapper<T, R>(initialValue: T, reverseValue?: R) {
        const result = useToggle(initialValue, reverseValue);
        return { value: result[0], ...result[1] };
    }

    it('should return initial value', () => {
        const { result: result1 } = renderHook(() => useToggleWrapper(false));
        expect(result1.current.value).toBeFalsy();

        const { result: result2 } = renderHook(() => useToggleWrapper(true));
        expect(result2.current.value).toBeTruthy();

        const { result: result3 } = renderHook(() => useToggleWrapper('hi'));
        expect(result3.current.value).toBe('hi');
    });

    it('should update the boolean value', () => {
        const { result } = renderHook(() => useToggleWrapper(true));

        act(() => result.current.setLeft());
        expect(result.current.value).toBeTruthy();

        act(() => result.current.setRight());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.setRight());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.setLeft());
        expect(result.current.value).toBeTruthy();

        act(() => result.current.toggle());
        expect(result.current.value).toBeFalsy();

        act(() => result.current.toggle());
        expect(result.current.value).toBeTruthy();
    });

    it('should update the string value', () => {
        const $true = 'true';
        const $false = 'false';

        const { result } = renderHook(() => useToggleWrapper($true, $false));

        act(() => result.current.setLeft());
        expect(result.current.value).toBe($true);

        act(() => result.current.setRight());
        expect(result.current.value).toBe($false);

        act(() => result.current.setRight());
        expect(result.current.value).toBe($false);

        act(() => result.current.setLeft());
        expect(result.current.value).toBe($true);

        act(() => result.current.toggle());
        expect(result.current.value).toBe($false);

        act(() => result.current.toggle());
        expect(result.current.value).toBe($true);

        act(() => result.current.toggle($true));
        expect(result.current.value).toBe($true);

        act(() => result.current.toggle($false));
        expect(result.current.value).toBe($false);
    });
});
