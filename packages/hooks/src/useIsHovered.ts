import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useIsHovered(
    ref: RefObject<HTMLElement | null | undefined>,
    maskRef?: RefObject<HTMLElement | null | undefined>,
    enabled = true,
): boolean {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

        if (enabled) {
            ref.current?.addEventListener('mouseover', handleMouseOver);
            (maskRef ?? ref).current?.addEventListener('mouseout', handleMouseOut);
        }

        const refCurrent = ref.current;
        const maskRefCurrent = maskRef?.current;

        return () => {
            if (enabled) {
                refCurrent?.removeEventListener('mouseover', handleMouseOver);
                (maskRefCurrent ?? refCurrent)?.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }, [enabled, maskRef, ref]);

    return isHovered;
}
