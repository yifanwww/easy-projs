import { useRef } from 'react';

export function useRenderCount(strict: boolean = true): Integer {
    const ref = useRef(-1);
    ref.current++;

    if (process.env.NODE_ENV === 'development') {
        // In development mode, `StrictMode` will double render in every rerender.
        //
        // React hijacks console.logs if you use `StrictMode`,
        // it comes that for every double render console.logs work only in the first render.

        return strict ? 1 + (ref.current + (ref.current % 2)) / 2 : 1 + ref.current;
    } else {
        return 1 + ref.current;
    }
}
