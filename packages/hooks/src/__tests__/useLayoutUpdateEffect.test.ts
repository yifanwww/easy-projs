import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useLayoutUpdateEffect } from '../useLayoutUpdateEffect.js';

describe(`Test react hook \`${useLayoutUpdateEffect.name}\``, () => {
    it('should run effect on update', () => {
        const effect = jest.fn<React.EffectCallback>();

        const { rerender } = renderHook(() => useLayoutUpdateEffect(effect));
        expect(effect).not.toHaveBeenCalled();

        rerender();
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should run cleanup on unmount', () => {
        const cleanup = jest.fn<() => void>();
        const effect = jest.fn<React.EffectCallback>().mockReturnValue(cleanup);
        const hook = renderHook(() => useLayoutUpdateEffect(effect));

        hook.rerender();
        hook.unmount();

        expect(cleanup).toHaveBeenCalledTimes(1);
    });
});
