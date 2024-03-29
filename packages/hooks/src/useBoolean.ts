import { useCallback, useState } from 'react';

/** Updater actions returned by `useBoolean`. */
export interface UseBooleanActions {
    /** Set the value to true. Always has the same identity. */
    readonly setTrue: () => void;
    /** Set the value to false. Always has the same identity. */
    readonly setFalse: () => void;
    /** Toggle the value. Always has the same identity. */
    readonly toggle: () => void;
}

/**
 * Hook to store a value and generate actions for setting the value to true or false.
 * The identity of the updater actions will always stay the same.
 *
 * @param initialValue Initial value.
 * @returns Array with the current value and an object containing the updater actions.
 */
export function useBoolean(initialValue = false): [boolean, UseBooleanActions] {
    const [value, setValue] = useState(initialValue);

    const setFalse = useCallback(() => setValue(false), []);
    const setTrue = useCallback(() => setValue(true), []);
    const toggle = useCallback(() => setValue((prev) => !prev), []);

    return [value, { setFalse, setTrue, toggle }];
}
