// reference:
// - https://github.com/microsoft/fluentui/blob/%40fluentui/react-hooks_v8.8.1/packages/react-hooks/src/useMergedRefs.ts

import { useCallback } from 'react';

/**
 * A Ref function which can be treated like a ref object in that it has an attached current property,
 * which will be updated as the ref is evaluated.
 */
export type CompositeRef<T> = React.RefObject<T> & React.RefCallback<T>;

/**
 * A React hook to compose multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback
 * that updates all provided refs.
 * @returns A function with an attached "current" property, so that it can be treated like a RefObject.
 */
export function useCompositeRef<T>(...refs: (React.Ref<T> | undefined)[]): CompositeRef<T> {
    const compositeCallback = useCallback(
        (value: T | null) => {
            (compositeCallback as React.MutableRefObject<T | null>).current = value;

            for (const ref of refs) {
                if (typeof ref === 'function') {
                    ref(value);
                } else if (ref) {
                    (ref as React.MutableRefObject<T | null>).current = value;
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
        [...refs],
    ) as CompositeRef<T>;

    if (!('current' in compositeCallback)) {
        (compositeCallback as React.MutableRefObject<T | null>).current = null;
    }

    return compositeCallback;
}
