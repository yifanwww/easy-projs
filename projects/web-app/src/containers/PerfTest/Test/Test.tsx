import { Button, InputNumber, message, Select } from 'antd';
import { useContext, useRef, useState } from 'react';
import Benchmark, { BenchmarkType } from 'react-component-benchmark';
import type { BenchmarkRef, BenchResultsType } from 'react-component-benchmark';

import { InputWrapper } from 'src/components/InputWrapper';
import { ResultTable } from 'src/components/ResultTable';
import { componentInfos, componentNames } from 'src/components/tests';
import { BenchmarkContext, BenchmarkUpdaterContext, benchmarkResultSelector } from 'src/contexts/BenchmarkContext';
import { useComponentNames } from 'src/hooks';
import type { BenchmarkTypes, ComponentName } from 'src/types/benchmark';

import { useGroupTest, useTest } from './hooks';

import css from './Test.module.scss';

export function Test(): React.ReactNode {
    const { totalResults } = useContext(BenchmarkContext);
    const updaters = useContext(BenchmarkUpdaterContext);

    const benchmarkRef = useRef<BenchmarkRef>(null);

    const benchmarkTypeState = useState<BenchmarkTypes>(BenchmarkType.MOUNT);
    const [benchmarkType, setBenchmarkType] = benchmarkTypeState;
    const componentNamesState = useComponentNames();
    const [componentName, { setComponentName }] = componentNamesState;
    const samplesState = useState(100);
    const [samples, setSamples] = samplesState;

    const [times, setTimes] = useState(1);

    const [isGroupTestRunning, { onCompleteOne: onCompleteOneGroupTest, startGroupTest }] = useGroupTest(
        times,
        benchmarkRef,
        benchmarkTypeState,
        componentNamesState,
    );
    const [isTestRunning, { onCompleteOne: onCompleteOneTest, startTest }] = useTest(times, benchmarkRef);

    const running = isGroupTestRunning || isTestRunning;

    const onBenchmarkComplete = (result: BenchResultsType) => {
        updaters.add({
            order: totalResults.ids.length + 1,
            name: componentName,
            type: benchmarkType,
            samples: result.sampleCount,
            stats: {
                mean: result.mean,
                stdDev: result.stdDev,
                p95: result.p95,
                p99: result.p99,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                layout: result.layout!.mean,
            },
        });

        if (isGroupTestRunning) onCompleteOneGroupTest();
        else if (isTestRunning) onCompleteOneTest();
    };

    const clearResults = () => updaters.clearAll();

    const changeComponentName = (name: ComponentName) => setComponentName(name);
    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    const changeSamples = (value: number | null) => value !== null && setSamples(value);
    const changeTimes = (value: number | null) => value !== null && setTimes(value);

    const copyResults = () => {
        void window.navigator.clipboard.writeText(JSON.stringify(totalResults));
        void message.info('Copy to clibboard successfully');
    };

    const totalCount = benchmarkResultSelector.selectTotal(totalResults);

    const controllerElement = (
        <div className={css.controller}>
            <div className={css.selectorBar}>
                <InputWrapper flexAuto title="Component">
                    <Select
                        className={css.select}
                        disabled={running}
                        value={componentName}
                        onChange={changeComponentName}
                    >
                        {componentNames.map((name) => (
                            <Select.Option key={name} value={name}>
                                {componentInfos[name].displayName}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper flexAuto title="Benchmark Type">
                    <Select
                        className={css.select}
                        disabled={running}
                        value={benchmarkType}
                        onChange={changeBenchmarkType}
                    >
                        {Object.values(BenchmarkType).map((type) => (
                            <Select.Option key={type} value={type}>
                                {type}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper title="Samples">
                    <InputNumber disabled={running} min={50} value={samples} onChange={changeSamples} />
                </InputWrapper>
                <InputWrapper title="Times">
                    <InputNumber disabled={running} min={1} value={times} onChange={changeTimes} />
                </InputWrapper>
            </div>
            <div className={css.buttonBar}>
                <Button className={css.button} disabled={running} onClick={startTest}>
                    Test
                </Button>
                <Button className={css.button} disabled={running} onClick={startGroupTest}>
                    Group Test
                </Button>
                <Button className={css.button} disabled={running || totalCount === 0} onClick={clearResults}>
                    Clear
                </Button>
                <Button className={css.button} disabled={running || totalCount === 0} onClick={copyResults}>
                    Copy Results
                </Button>
            </div>
        </div>
    );

    return (
        <div className={css.layout}>
            <div className={css.display}>
                {controllerElement}
                <ResultTable />
            </div>

            <div className={css.test}>
                <Benchmark
                    key={`${componentName}-${benchmarkType}-${totalCount}`}
                    component={componentInfos[componentName].component}
                    includeLayout
                    onComplete={onBenchmarkComplete}
                    ref={benchmarkRef}
                    samples={samples}
                    timeout={10000}
                    type={benchmarkType}
                />
            </div>
        </div>
    );
}
