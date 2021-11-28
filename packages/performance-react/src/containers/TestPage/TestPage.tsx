import { Button, InputNumber, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useContext, useRef, useState } from 'react';
import Benchmark, { BenchmarkType, BenchmarkRef, BenchResultsType } from 'react-component-benchmark';

import { BenchmarkTypes } from 'src/common/benchmark';
import { InputWrapper } from 'src/components/InputWrapper';
import { ResultTable } from 'src/components/ResultTable';
import { componentInfos } from 'src/components/tests';
import { BenchmarkContext, BenchmarkContextUpdater, benchmarkResultSelector } from 'src/contexts/BenchmarkContext';
import { useComponentNames, useMultipleTest, useOptimization, useTest } from 'src/hooks';

import scss from './TestPage.module.scss';

export function TestPage(): React.ReactElement {
    const { totalResults } = useContext(BenchmarkContext);
    const updaters = useContext(BenchmarkContextUpdater);

    const benchmarkRef = useRef<BenchmarkRef>(null);

    const benchmarkTypeState = useState<BenchmarkTypes>(BenchmarkType.MOUNT);
    const [benchmarkType, setBenchmarkType] = benchmarkTypeState;
    const componentNamesState = useComponentNames(Object.keys(componentInfos));
    const [componentName, { setComponentName }] = componentNamesState;
    const samplesState = useState(100);
    const [samples, setSamples] = samplesState;

    const [task, setTask] = useState<'optimize' | 'benchmark' | 'benchmark-50'>('benchmark');

    const [isOptimizationRunning, { onComplete: onCompleteForOptimization, startOptimization }] = useOptimization(
        benchmarkRef,
        benchmarkTypeState,
        componentNamesState,
        samplesState,
    );
    const [isTestRunning, { onComplete: onCompleteForTest, startTest }] = useTest(benchmarkRef);
    const [isMultipleTestRunning, { onComplete: onCompleteForMultipleTest, startMultipleTest }] =
        useMultipleTest(benchmarkRef);

    const running = isOptimizationRunning || isTestRunning || isMultipleTestRunning;

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
                layout: result.layout!.mean,
            },
        });

        if (task === 'optimize') onCompleteForOptimization();
        else if (task === 'benchmark') onCompleteForTest();
        else if (task === 'benchmark-50') onCompleteForMultipleTest();
    };

    const optimize = () => {
        setTask('optimize');
        startOptimization();
    };

    const startBenchmark = () => {
        setTask('benchmark');
        startTest();
    };

    const startBenchmark50 = () => {
        setTask('benchmark-50');
        startMultipleTest();
    };

    const clearResults = () => updaters.clearAll();

    const changeComponentName = (name: string) => setComponentName(name);

    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    const changeSamples = (value: number) => setSamples(value);

    const copyResults = () => {
        copy(JSON.stringify(totalResults));
        message.info('Copy to clibboard successfully');
    };

    const totalCount = benchmarkResultSelector.selectTotal(totalResults);

    const controllerElement = (
        <div className={scss.controller}>
            <div className={scss.selectorBar}>
                <InputWrapper flexAuto title="Component">
                    <Select
                        className={scss.select}
                        disabled={running}
                        value={componentName}
                        onChange={changeComponentName}
                    >
                        {Object.keys(componentInfos).map((name) => (
                            <Select.Option key={name} value={name}>
                                {componentInfos[name].displayName}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper flexAuto title="Benchmark Type">
                    <Select
                        className={scss.select}
                        disabled={running}
                        value={benchmarkType}
                        onChange={changeBenchmarkType}
                    >
                        {Object.keys(BenchmarkType).map((type) => (
                            <Select.Option key={type} value={type}>
                                {type.toLowerCase()}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper title="Samples">
                    <InputNumber disabled={running} min={50} value={samples} onChange={changeSamples} />
                </InputWrapper>
            </div>
            <div className={scss.buttonBar}>
                <Button className={scss.button} disabled={running} onClick={optimize}>
                    Optimize
                </Button>
                <Button className={scss.button} disabled={running} onClick={startBenchmark}>
                    Start
                </Button>
                <Button className={scss.button} disabled={running} onClick={startBenchmark50}>
                    Start 50
                </Button>
                <Button className={scss.button} disabled={running || totalCount === 0} onClick={clearResults}>
                    Clear
                </Button>
                <Button className={scss.button} disabled={running || totalCount === 0} onClick={copyResults}>
                    Copy Results
                </Button>
            </div>
        </div>
    );

    return (
        <div className={scss.root}>
            <div className={scss.display}>
                {controllerElement}
                <ResultTable />
            </div>

            <div className={scss.test}>
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
