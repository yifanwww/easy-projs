import type { Integer } from '@easy-pkg/types/primitives';

export interface RenderContextState {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface RenderContextUpdaters {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}

export type RenderContextValue = RenderContextState & RenderContextUpdaters;
