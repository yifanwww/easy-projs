import type { UnknownFn, VoidReturn } from '@easy-pkg/types';
import { useCallback } from 'react';

import { useTimeout } from './useTimeout.js';

/**
 * Hook to generate a delayed execution function.
 * The callback function will be called after a period of time. The timeout timer will be refreshed if it is triggered
 * before the timeout timer expires.
 *
 * @param fn A callback function to be called after a period of time.
 * @param delay The delay in microseconds. Default is `1000`.
 * @returns The trigger.
 */
export function useDelayFn<T extends UnknownFn>(fn?: T, delay = 1000): VoidReturn<T> {
    const { clearTimeout, setTimeout } = useTimeout();

    const _fn = useCallback(
        (...args: never[]) => {
            clearTimeout();

            if (fn) {
                setTimeout(() => fn(...args), delay) as unknown as number;
            }
        },
        [clearTimeout, delay, fn, setTimeout],
    );

    return _fn as T;
}
