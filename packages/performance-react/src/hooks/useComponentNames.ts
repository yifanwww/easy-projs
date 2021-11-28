import { useConstFn, usePersistFn } from '@easy/hooks';
import { useState } from 'react';

import { ComponentName } from 'src/common/benchmark';
import { componentNames } from 'src/components/tests';

export interface UseComponentKeysActions {
    selectFirst: () => void;
    selectNext: () => boolean;
    setComponentName: (name: ComponentName) => void;
}

export function useComponentNames(): [ComponentName, UseComponentKeysActions] {
    const [name, setName] = useState(componentNames[0]);

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

    const setComponentName = useConstFn((_key: ComponentName) => setName(_key));

    return [name, { selectFirst, selectNext, setComponentName }];
}
