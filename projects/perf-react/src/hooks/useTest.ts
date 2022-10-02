import { useForceUpdate, usePersistFn } from '@easy-pkg/hooks';
import { useEffect } from 'react';
import type { BenchmarkRef } from 'react-component-benchmark';

import { useRound } from './useRound';

export interface UseTestActions {
    onCompleteOne: () => void;
    startTest: () => void;
}

export function useTest(times: number, benchmarkRef: React.RefObject<BenchmarkRef>): [boolean, UseTestActions] {
    const [isRoundZero, { decrease, set }] = useRound();

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (!isRoundZero) {
            benchmarkRef.current?.start();
        }
    });

    const startTest = usePersistFn(() => {
        set(times);
        forceUpdate();
    });

    return [!isRoundZero, { onCompleteOne: decrease, startTest }];
}
