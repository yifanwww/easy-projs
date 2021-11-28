import { useConstFn, usePersistFn } from '@easy/hooks';
import { useState } from 'react';

export interface UseComponentKeysActions {
    selectFirst: () => void;
    selectNext: () => boolean;
    setComponentName: (key: string) => void;
}

export function useComponentNames(names: string[]): [string, UseComponentKeysActions] {
    const [name, setName] = useState(names[0]);

    const selectFirst = usePersistFn(() => setName(names[0]));

    const selectNext = usePersistFn(() => {
        const index = names.indexOf(name);
        if (index === names.length - 1) {
            return false;
        } else {
            setName(names[index + 1]);
            return true;
        }
    });

    const setComponentName = useConstFn((_key: string) => setName(_key));

    return [name, { selectFirst, selectNext, setComponentName }];
}
