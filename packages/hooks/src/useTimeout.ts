import { useCallback, useEffect, useRef } from 'react';

export interface UseTimeoutActions {
    readonly isWorking: () => boolean;
    readonly setTimeout: (callback: () => void, duration?: number) => void;
    readonly clearTimeout: () => void;
}

/**
 *  Returns a wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useTimeout(): UseTimeoutActions {
    const timeoutIdRef = useRef<number>(undefined);

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the timeout timer if it exists.
        return () => window.clearTimeout(timeoutIdRef.current);
    }, []);

    const isWorking = useCallback(() => timeoutIdRef.current !== undefined, []);

    const setTimeout = useCallback((callback: () => void, duration?: number): void => {
        window.clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = window.setTimeout(() => {
            timeoutIdRef.current = undefined;
            callback();
        }, duration);
    }, []);

    const clearTimeout = useCallback(() => window.clearTimeout(timeoutIdRef.current), []);

    return { isWorking, setTimeout, clearTimeout };
}
