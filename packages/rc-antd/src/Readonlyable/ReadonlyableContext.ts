import { createContext } from 'react';

export interface ReadonlyableContextValue {
    readonly: boolean;
}

export const ReadonlyableContext = createContext<ReadonlyableContextValue | null>(null);
