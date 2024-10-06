import { useLayoutEffect } from 'react';
import { useFirstMountState } from 'react-use';

export const useLayoutUpdateEffect: typeof useLayoutEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState();

    useLayoutEffect(
        () => {
            if (!isFirstMount) {
                return effect();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
};
