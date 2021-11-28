import { useForceUpdate, usePersistFn } from '@easy/hooks';
import { useEffect, useRef } from 'react';
import { BenchmarkRef } from 'react-component-benchmark';

import { BenchmarkTypes, ComponentName } from 'src/common/benchmark';

import { UseComponentKeysActions } from './useComponentNames';
import { useRound } from './useRound';

export interface UseGroupTestActions {
    onCompleteOne: () => void;
    startGroupTest: () => void;
}

export function useGroupTest(
    times: number,
    benchmarkRef: React.RefObject<BenchmarkRef>,
    [benchmarkType, setBenchmarkType]: [BenchmarkTypes, React.Dispatch<React.SetStateAction<BenchmarkTypes>>],
    [componentName, { isLast, selectFirst, selectNext, setComponentName }]: [ComponentName, UseComponentKeysActions],
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

        roundActions.decrease();
        const round = roundActions.get();

        if (round === 0 && !isLast()) {
            roundActions.set(times);
            selectNext();
        } else if (round === 0 && isLast()) {
            if (benchmarkType === 'update') {
                running.current = false;
            } else {
                roundActions.set(times);
                selectFirst();
                setBenchmarkType(benchmarkType === 'mount' ? 'unmount' : 'update');
            }
        }
    });

    return [running.current, { onCompleteOne, startGroupTest }];
}
