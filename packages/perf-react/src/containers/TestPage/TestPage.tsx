import { Button, InputNumber, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useContext, useRef, useState } from 'react';
import Benchmark, { BenchmarkType, BenchmarkRef, BenchResultsType } from 'react-component-benchmark';

import { BenchmarkTypes, ComponentName } from 'src/common/benchmark';
import { InputWrapper } from 'src/components/InputWrapper';
import { ResultTable } from 'src/components/ResultTable';
import { componentInfos, componentNames } from 'src/components/tests';
import { BenchmarkContext, BenchmarkContextUpdater, benchmarkResultSelector } from 'src/contexts/BenchmarkContext';
import { useComponentNames, useGroupTest, useTest } from 'src/hooks';

import scss from './TestPage.module.scss';

const TestPage: React.FC = () => {
    const { totalResults } = useContext(BenchmarkContext);
    const updaters = useContext(BenchmarkContextUpdater);

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
                layout: result.layout!.mean,
            },
        });

        if (isGroupTestRunning) onCompleteOneGroupTest();
        else if (isTestRunning) onCompleteOneTest();
    };

    const clearResults = () => updaters.clearAll();

    const changeComponentName = (name: ComponentName) => setComponentName(name);
    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    const changeSamples = (value: number) => setSamples(value);
    const changeTimes = (value: number) => setTimes(value);

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
                        {componentNames.map((name) => (
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
            <div className={scss.buttonBar}>
                <Button className={scss.button} disabled={running} onClick={startTest}>
                    Test
                </Button>
                <Button className={scss.button} disabled={running} onClick={startGroupTest}>
                    Group Test
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
};

export default TestPage;
