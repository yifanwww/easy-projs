import { useEffect } from 'react';
import type { RefObject } from 'react';

import { useBoolean } from './useBoolean.js';

export function useIsHovered<T extends RefObject<HTMLElement>>(ref: T, enabled = true): boolean {
    const [isHovered, { setFalse: mouseOut, setTrue: mouseOver }] = useBoolean(false);

    useEffect(() => {
        if (enabled && ref.current) {
            ref.current.addEventListener('mouseover', mouseOver);
            ref.current.addEventListener('mouseout', mouseOut);
        }

        // fixes react-hooks/exhaustive-deps warning about stale ref elements
        const { current } = ref;

        return () => {
            if (enabled && current) {
                current.removeEventListener('mouseover', mouseOver);
                current.removeEventListener('mouseout', mouseOut);
            }
        };
    }, [enabled, mouseOut, mouseOver, ref]);

    return isHovered;
}
