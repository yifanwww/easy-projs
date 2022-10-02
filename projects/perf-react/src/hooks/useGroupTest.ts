import { useForceUpdate, usePersistFn } from '@easy-pkg/hooks';
import { useEffect, useRef } from 'react';
import type { BenchmarkRef } from 'react-component-benchmark';

import type { BenchmarkTypes, ComponentName } from 'src/common/benchmark';

import type { UseComponentKeysActions } from './useComponentNames';
import { useRound } from './useRound';

export interface UseGroupTestActions {
    onCompleteOne: () => void;
    startGroupTest: () => void;
}

export function useGroupTest(
    times: number,
    benchmarkRef: React.RefObject<BenchmarkRef>,
    [benchmarkType, setBenchmarkType]: [BenchmarkTypes, React.Dispatch<React.SetStateAction<BenchmarkTypes>>],
    [componentName, { selectFirst, selectNext, setComponentName }]: [ComponentName, UseComponentKeysActions],
): [boolean, UseGroupTestActions] {
    const originBenchmarkType = useRef<BenchmarkTypes>();
    const originComponentName = useRef<ComponentName>();

    const running = useRef(false);
    const [, roundActions] = useRound();

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (running.current === true) {
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
        }
    });

    const startGroupTest = usePersistFn(() => {
        originBenchmarkType.current = benchmarkType;
        originComponentName.current = componentName;

        running.current = true;
        roundActions.set(times);

        setBenchmarkType('mount');
        selectFirst();

        forceUpdate();
    });

    const onCompleteOne = usePersistFn(() => {
        if (!running) return;

        if (!selectNext()) {
            if (benchmarkType !== 'update') {
                selectFirst();
                setBenchmarkType(benchmarkType === 'mount' ? 'unmount' : 'update');
            } else {
                roundActions.decrease();
                const round = roundActions.get();
                if (round === 0) {
                    running.current = false;
                } else {
                    setBenchmarkType('mount');
                    selectFirst();
                }
            }
        }
    });

    return [running.current, { onCompleteOne, startGroupTest }];
}
