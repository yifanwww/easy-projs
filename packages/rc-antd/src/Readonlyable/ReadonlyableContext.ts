import type { Nullable } from '@easy-pkg/types/utils';
import { createContext } from 'react';

export interface ReadonlyableContextValue {
    readonly: boolean;
}

export const ReadonlyableContext = createContext<Nullable<ReadonlyableContextValue>>(null);
