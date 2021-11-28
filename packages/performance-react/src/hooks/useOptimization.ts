import { usePersistFn } from '@easy/hooks';
import { useEffect, useRef, useState } from 'react';
import { BenchmarkRef } from 'react-component-benchmark';

import { BenchmarkTypes, ComponentName } from 'src/common/benchmark';

import { UseComponentKeysActions } from './useComponentNames';

export interface UseOptimizationModeActions {
    onComplete: () => void;
    startOptimization: () => void;
}

export function useOptimization(
    benchmarkRef: React.RefObject<BenchmarkRef>,
    [benchmarkType, setBenchmarkType]: [BenchmarkTypes, React.Dispatch<React.SetStateAction<BenchmarkTypes>>],
    [componentName, { selectFirst, selectNext, setComponentName }]: [ComponentName, UseComponentKeysActions],
    [samples, setSamples]: [number, React.Dispatch<React.SetStateAction<number>>],
): [boolean, UseOptimizationModeActions] {
    const originBenchmarkType = useRef<BenchmarkTypes>();
    const originComponentName = useRef<ComponentName>();
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
            if (originComponentName.current) {
                setComponentName(originComponentName.current);
                originComponentName.current = undefined;
            }
            if (originSamples.current) {
                setSamples(originSamples.current);
                originSamples.current = undefined;
            }
        }
    });

    const startOptimization = usePersistFn(() => {
        originBenchmarkType.current = benchmarkType;
        originComponentName.current = componentName;
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
