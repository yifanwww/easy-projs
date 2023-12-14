import { usePersistFn } from '@easy-pkg/hooks';
import { useCallback, useState } from 'react';

import { componentNames } from 'src/components/tests';
import type { ComponentName } from 'src/types/benchmark';

export interface UseComponentKeysActions {
    isLast: () => boolean;
    selectFirst: () => void;
    selectNext: () => boolean;
    setComponentName: (name: ComponentName) => void;
}

export function useComponentNames(): [ComponentName, UseComponentKeysActions] {
    const [name, setName] = useState(componentNames[0]);

    const isLast = usePersistFn(() => name === componentNames[componentNames.length - 1]);

    const selectFirst = usePersistFn(() => setName(componentNames[0]));

    const selectNext = usePersistFn(() => {
        const index = componentNames.indexOf(name);
        if (index === componentNames.length - 1) {
            return false;
        } else {
            setName(componentNames[index + 1]);
            return true;
        }
    });

    const setComponentName = useCallback((_key: ComponentName) => setName(_key), []);

    return [name, { isLast, selectFirst, selectNext, setComponentName }];
}
