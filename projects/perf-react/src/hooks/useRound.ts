import { useConstFn } from '@easy-pkg/hooks';
import { useRef } from 'react';

export interface UseRoundActions {
    decrease: () => void;
    get: () => number;
    set: (round: number) => void;
}

export function useRound(): [boolean, UseRoundActions] {
    const round = useRef(0);

    const decrease = useConstFn(() => {
        if (round.current > 0) {
            round.current--;
        }
    });

    const get = useConstFn(() => round.current);

    const set = useConstFn((_round: number) => {
        round.current = _round;
    });

    return [round.current === 0, { decrease, get, set }];
}
