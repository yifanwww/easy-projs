import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useIsHovered<T extends RefObject<HTMLElement>>(ref: T, enabled = true): boolean {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = useCallback(() => setIsHovered(true), []);
    const handleMouseOut = useCallback(() => setIsHovered(false), []);

    useEffect(() => {
        if (enabled && ref.current) {
            ref.current.addEventListener('mouseover', handleMouseOver);
            ref.current.addEventListener('mouseout', handleMouseOut);
        }

        // fixes react-hooks/exhaustive-deps warning about stale ref elements
        const { current } = ref;

        return () => {
            if (enabled && current) {
                current.removeEventListener('mouseover', handleMouseOver);
                current.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }, [enabled, handleMouseOut, handleMouseOver, ref]);

    return isHovered;
}
