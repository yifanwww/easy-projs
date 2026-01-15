import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useIsFocused(ref: RefObject<HTMLElement | null | undefined>, enabled = true): boolean {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocusIn = useCallback(() => setIsFocused(true), []);
    const handleFocusOut = useCallback(() => setIsFocused(false), []);

    useEffect(() => {
        if (enabled && ref.current) {
            ref.current.addEventListener('focusin', handleFocusIn);
            ref.current.addEventListener('focusout', handleFocusOut);
        }

        // fixes react-hooks/exhaustive-deps warning about stale ref elements
        const { current } = ref;

        return () => {
            if (enabled && current) {
                current.removeEventListener('focusin', handleFocusIn);
                current.removeEventListener('focusout', handleFocusOut);
            }
        };
    }, [enabled, handleFocusIn, handleFocusOut, ref]);

    return isFocused;
}
