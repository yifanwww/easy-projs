import { useConstFn, usePersistFn } from '@easy/hooks';
import { useState } from 'react';

export interface UseComponentKeysActions {
    selectFirst: () => void;
    selectNext: () => boolean;
    setComponentKey: (key: string) => void;
}

export function useComponentKeys(keys: string[]): [string, UseComponentKeysActions] {
    const [key, setKey] = useState(keys[0]);

    const selectFirst = usePersistFn(() => setKey(keys[0]));

    const selectNext = usePersistFn(() => {
        const index = keys.indexOf(key);
        if (index === keys.length - 1) {
            return false;
        } else {
            setKey(keys[index + 1]);
            return true;
        }
    });

    const setComponentKey = useConstFn((_key: string) => setKey(_key));

    return [key, { selectFirst, selectNext, setComponentKey }];
}
