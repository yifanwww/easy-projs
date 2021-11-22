import { useConstFn } from '@easy/hooks';
import { useRef } from 'react';

import { InspectionData } from 'src/common/inspection';

export interface UseDoubleRenderSignActions {
    readonly sign: (record: InspectionData) => boolean;
}

export function useDoubleRenderSign(): UseDoubleRenderSignActions {
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<Record<string, boolean>>({});

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const sign = useConstFn((record: InspectionData): boolean => {
            const key = JSON.stringify(record);

            ref.current[key] = ref.current[key] === undefined ? false : !ref.current[key];

            return ref.current[key];
        });

        return { sign };
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const sign = useConstFn(() => true);
        return { sign };
    }
}
