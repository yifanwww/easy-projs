import type { Integer } from '@easy-pkg/utils-type';
import { useRef } from 'react';

export function useRenderCount(): Integer {
    const ref = useRef(0);
    ref.current++;
    return ref.current;
}
