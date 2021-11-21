import { usePersistFn } from '@easy/hooks';
import { useEffect, useRef, useState } from 'react';
import { BenchmarkRef } from 'react-component-benchmark';

import { BenchmarkTypes } from 'src/common/benchmark';

import { UseComponentKeysActions } from './useComponentKeys';

export interface UseOptimizationModeActions {
    onComplete: () => void;
    startOptimization: () => void;
}

export function useOptimization(
    benchmarkRef: React.RefObject<BenchmarkRef>,
    [benchmarkType, setBenchmarkType]: [BenchmarkTypes, React.Dispatch<React.SetStateAction<BenchmarkTypes>>],
    [componentKey, { selectFirst, selectNext, setComponentKey }]: [string, UseComponentKeysActions],
    [samples, setSamples]: [number, React.Dispatch<React.SetStateAction<number>>],
): [boolean, UseOptimizationModeActions] {
    const originBenchmarkType = useRef<BenchmarkTypes>();
    const originComponentKey = useRef<string>();
    const originSamples = useRef<number>();

    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (running === true) {
            benchmarkRef.current?.start();
        } else {
            if (originBenchmarkType.current) {
                setBenchmarkType(originBenchmarkType.current);
                originBenchmarkType.current = undefined;
            }
            if (originComponentKey.current) {
                setComponentKey(originComponentKey.current);
                originComponentKey.current = undefined;
            }
            if (originSamples.current) {
                setSamples(originSamples.current);
                originSamples.current = undefined;
            }
        }
    });

    const startOptimization = usePersistFn(() => {
        originBenchmarkType.current = benchmarkType;
        originComponentKey.current = componentKey;
        originSamples.current = samples;

        setRunning(true);
        setBenchmarkType('mount');
        setSamples(50);
        selectFirst();
    });

    const onComplete = usePersistFn(() => {
        if (!running) return;

        const res = selectNext();
        if (!res) {
            switch (benchmarkType) {
                case 'mount':
                    setBenchmarkType('unmount');
                    selectFirst();
                    break;
                case 'unmount':
                    setBenchmarkType('update');
                    selectFirst();
                    break;

                default:
                    setRunning(false);
            }
        }
    });

    return [running, { onComplete, startOptimization }];
}
