import { useRef } from 'react';

export function useRenderCount(): Integer {
    const ref = useRef(-1);
    ref.current++;

    if (process.env.NODE_ENV === 'development') {
        // In development mode, `StrictMode` will double render in every render.
        //
        // React hijacks console.logs if you use `StrictMode`,
        // it comes that for every double render console.logs work only in the first render.
        //
        // A special thing you should notice is what happens during FDR (first double render):
        // At the first render of FDR, `ref.current` uses initial value `-1` then be increased to `0`,
        // but at the second render of FDR, `ref.current` uses initial value `-1` again then be increased to `0`.

        return 1 + (ref.current + (ref.current % 2)) / 2;
    } else {
        return 1 + ref.current;
    }
}
