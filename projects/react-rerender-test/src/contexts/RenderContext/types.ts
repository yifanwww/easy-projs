export interface IRenderContextState {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface IRenderContextUpdaters {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}
