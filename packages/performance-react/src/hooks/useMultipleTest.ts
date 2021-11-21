import { useConstFn } from '@easy/hooks';
import { useEffect, useState } from 'react';
import { BenchmarkRef } from 'react-component-benchmark';

export interface UseMultipleTestActions {
    onComplete: () => void;
    startMultipleTest: () => void;
}

export function useMultipleTest(benchmarkRef: React.RefObject<BenchmarkRef>): [boolean, UseMultipleTestActions] {
    const [round, setRound] = useState(0);

    useEffect(() => {
        if (round !== 0) {
            benchmarkRef.current?.start();
        }
    });

    const startMultipleTest = useConstFn(() => setRound(50));

    const onComplete = useConstFn(() => setRound((prev) => prev - 1));

    return [round !== 0, { onComplete, startMultipleTest }];
}
