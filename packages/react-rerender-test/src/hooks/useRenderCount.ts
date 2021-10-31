import { useRef } from 'react';

export function useRenderCount(): Integer {
    const ref = useRef(-1);
    ref.current++;

    if (process.env.NODE_ENV === 'development') {
        // In development mode, `StrictMode` will double-render in every render.
        return 1 + ref.current / 2;
    } else {
        return 1 + ref.current;
    }
}
