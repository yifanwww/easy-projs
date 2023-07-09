import type { Integer } from '@easy-pkg/utils-type';

export interface RenderContextState {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface RenderContextUpdaters {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}
