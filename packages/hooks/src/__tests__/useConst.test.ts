import { validateHookValueNotChanged } from '@easy-pkg/utils-test';
import { renderHook } from '@testing-library/react';

import { useConst } from '../useConst.js';

describe(`Test react hook \`${useConst.name}\``, () => {
    validateHookValueNotChanged('should return the same value with value initializer', () => [useConst(Math.random())]);

    validateHookValueNotChanged('should return the same value with function initializer', () => [
        useConst(Math.random),
    ]);

    it('should call the function initializer only once', () => {
        const initializer = jest.fn(() => Math.random());
        const { rerender, result } = renderHook(() => useConst(initializer));

        const firstValue = result.current;
        // Re-render the component
        rerender();
        // Text should be the same
        expect(result.current).toBe(firstValue);
        // Function shouldn't have been called again
        expect(initializer).toHaveBeenCalledTimes(1);
    });

    it('should work with a function initializer which returns `undefined`', () => {
        const initializer = jest.fn(() => undefined);
        const { rerender } = renderHook(() => useConst(initializer));

        // Re-render the component
        rerender();
        // Function shouldn't have been called again
        expect(initializer).toHaveBeenCalledTimes(1);
    });
});
