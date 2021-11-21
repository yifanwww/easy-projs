import { useConstFn } from '@easy/hooks';
import { useState } from 'react';
import { BenchmarkRef } from 'react-component-benchmark';

export interface UseTestActions {
    onComplete: () => void;
    startTest: () => void;
}

export function useTest(benchmarkRef: React.RefObject<BenchmarkRef>): [boolean, UseTestActions] {
    const [running, setRunning] = useState(false);

    const startTest = useConstFn(() => {
        setRunning(true);
        benchmarkRef.current?.start();
    });

    const onComplete = useConstFn(() => setRunning(false));

    return [running, { onComplete, startTest }];
}
