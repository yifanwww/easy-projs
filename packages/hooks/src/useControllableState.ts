import { useState } from 'react';

type Dispatcher<T> = React.Dispatch<React.SetStateAction<T>>;

function useControllableState<T>(initialState: T | (() => T), value?: T): [T, Dispatcher<T>];
function useControllableState<T = undefined>(
    initialState?: T | (() => T),
    value?: T,
): [T | undefined, Dispatcher<T | undefined>];

function useControllableState<T = undefined>(
    initialState?: T | (() => T),
    value?: T,
): [T | undefined, Dispatcher<T | undefined>] {
    const [innerState, setInnerState] = useState<T | undefined>(() =>
        typeof initialState === 'function' ? (initialState as () => T)() : initialState,
    );

    // we only think `undefined` as uncontrolled mode
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const state = value !== undefined ? value : innerState;

    return [state, setInnerState];
}

export { useControllableState };
