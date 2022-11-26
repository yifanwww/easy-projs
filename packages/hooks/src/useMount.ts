import { useEffect, useRef } from 'react';

/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback Function to call before mount.
 */
export function useMount(callback?: () => void): void {
    const mountRef = useRef(callback);

    // Update the ref each render so that the latest callback will be invoked if it changes.
    mountRef.current = callback;

    useEffect(() => {
        mountRef.current?.();
    }, []);
}
