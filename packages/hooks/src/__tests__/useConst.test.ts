import { validateHookValueNotChanged } from '@easy/utils-test';
import { renderHook } from '@testing-library/react-hooks';

import { useConst } from '../useConst';

describe(`Test react hook \`${useConst.name}\``, () => {
    validateHookValueNotChanged('returns the same value with value initializer', () => [useConst(Math.random())]);

    validateHookValueNotChanged('returns the same value with function initializer', () => [useConst(Math.random)]);

    it('calls the function initializer only once', () => {
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

    it('works with a function initializer which returns undefined', () => {
        const initializer = jest.fn(() => undefined);
        const { rerender } = renderHook(() => useConst(initializer));

        // Re-render the component
        rerender();
        // Function shouldn't have been called again
        expect(initializer).toHaveBeenCalledTimes(1);
    });
});
