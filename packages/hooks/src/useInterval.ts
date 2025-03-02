import { useCallback, useEffect, useRef } from 'react';

export interface UseIntervalActions {
    readonly isWorking: () => boolean;
    readonly setInterval: (callback: () => void, duration?: number) => void;
    readonly clearInterval: () => void;
}

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export function useInterval(): UseIntervalActions {
    const intervalIdRef = useRef<number>();

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the interval timer if it exists.
        return () => window.clearInterval(intervalIdRef.current);
    }, []);

    const isWorking = useCallback(() => intervalIdRef.current !== undefined, []);

    const setInterval = useCallback((callback: () => void, duration?: number): void => {
        window.clearInterval(intervalIdRef.current);

        intervalIdRef.current = window.setInterval(callback, duration) as unknown as number;
    }, []);

    const clearInterval = useCallback(() => window.clearInterval(intervalIdRef.current), []);

    return { isWorking, setInterval, clearInterval };
}
