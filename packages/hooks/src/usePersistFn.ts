// reference:
// - https://github.com/alibaba/hooks/blob/v3.7.11/packages/hooks/src/useMemoizedFn/index.ts
// - https://github.com/microsoft/fluentui/blob/%40fluentui/react-hooks_v8.8.1/packages/react-hooks/src/useEventCallback.ts

import type { UnknownFn } from '@easy-lib/types';
import { useMemo, useRef } from 'react';

/**
 * Hook to return a persist function.
 * Unlike `React.useCallback`, this is guaranteed to always return the same function,
 * and no need to use `React.useMemo` or `React.useCallback` to warp the dependencies.
 *
 * @param fn Function that hopes to keep the same.
 * @returns The function. The identity of this function will never change.
 */
export function usePersistFn<T extends UnknownFn>(fn: T): T {
    const fnRef = useRef<T>(fn);

    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo(() => fn, [fn]);

    const persistFnRef = useRef<T>(undefined);
    persistFnRef.current ??= ((...args) => fnRef.current(...args)) as T;
    return persistFnRef.current;
}
