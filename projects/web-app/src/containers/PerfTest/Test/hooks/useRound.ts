import { useCallback, useRef } from 'react';

export interface UseRoundActions {
    decrease: () => void;
    get: () => number;
    set: (round: number) => void;
}

export function useRound(): [boolean, UseRoundActions] {
    const round = useRef(0);

    const decrease = useCallback(() => {
        if (round.current > 0) {
            round.current--;
        }
    }, []);

    const get = useCallback(() => round.current, []);

    const set = useCallback((_round: number) => {
        round.current = _round;
    }, []);

    return [round.current === 0, { decrease, get, set }];
}
