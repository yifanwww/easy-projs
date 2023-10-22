import type { Nullable } from '@easy-pkg/utils-type';
import { createContext } from 'react';

export interface ReadonlyableContextState {
    readonly: boolean;
}

export const ReadonlyableContext = createContext<Nullable<ReadonlyableContextState>>(null);
