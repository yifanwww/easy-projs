import { useRef } from 'react';

export function useFnCallInStrictMode(fn: () => void): void {
    const ref = useRef(-1);
    ref.current++;

    if (process.env.NODE_ENV === 'development') {
        // In development mode, `StrictMode` will double render in every rerender.
        //
        // But if you print `ref.current`, you will get `1` in first render,
        // after that you will get every odd in every rerender.
        //
        // React hijacks console.logs if you use `StrictMode`,
        // it comes that for every double render console.logs work only in the first render.

        if (ref.current % 2 === 0) fn();
    } else {
        fn();
    }
}
