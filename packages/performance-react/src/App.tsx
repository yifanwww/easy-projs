import { Button, InputNumber, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useReducer, useRef, useState } from 'react';
import Benchmark, { BenchmarkType, BenchmarkRef, BenchResultsType } from 'react-component-benchmark';

import { useComponentKeys, useMultipleTest, useOptimization, useTest } from './hooks';
import { InputWrapper } from './InputWrapper';
import { ResultTable } from './ResultTable';
import { componentInfos } from './tests';
import { BenchmarkResult, BenchmarkTypes } from './types';

import scss from './App.module.scss';

function reducer(state: BenchmarkResult[], action: BenchmarkResult | 'clear') {
    if (action === 'clear') {
        return [];
    } else {
        return [action, ...state];
    }
}

export function App(): React.ReactElement {
    const benchmarkRef = useRef<BenchmarkRef>(null);

    const benchmarkTypeState = useState<BenchmarkTypes>(BenchmarkType.MOUNT);
    const [benchmarkType, setBenchmarkType] = benchmarkTypeState;
    const componentKeysState = useComponentKeys(Object.keys(componentInfos));
    const [componentKey, { setComponentKey }] = componentKeysState;
    const samplesState = useState(100);
    const [samples, setSamples] = samplesState;

    const [results, dispatch] = useReducer(reducer, []);

    const [task, setTask] = useState<'optimize' | 'benchmark' | 'benchmark-50'>('benchmark');

    const [isOptimizationRunning, { onComplete: onCompleteForOptimization, startOptimization }] = useOptimization(
        benchmarkRef,
        benchmarkTypeState,
        componentKeysState,
        samplesState,
    );
    const [isTestRunning, { onComplete: onCompleteForTest, startTest }] = useTest(benchmarkRef);
    const [isMultipleTestRunning, { onComplete: onCompleteForMultipleTest, startMultipleTest }] =
        useMultipleTest(benchmarkRef);

    const running = isOptimizationRunning || isTestRunning || isMultipleTestRunning;

    const onBenchmarkComplete = (result: BenchResultsType) => {
        dispatch({
            order: results.length + 1,
            name: `${componentKey} - ${benchmarkType}`,
            samples: result.sampleCount,
            mean: result.mean,
            stdDev: result.stdDev,
            p95: result.p95,
            p99: result.p99,
            layout: result.layout!.mean,
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

    const clearResults = () => dispatch('clear');

    const changeComponentKey = (key: string) => setComponentKey(key);

    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    const changeSamples = (value: number) => setSamples(value);

    const copyResults = () => {
        copy(JSON.stringify(results));
        message.info('Copy to clibboard successfully');
    };

    return (
        <div className={scss.root}>
            <div className={scss.display}>
                <div className={scss.selector}>
                    <InputWrapper flexAuto title="Component">
                        <Select
                            className={scss.select}
                            disabled={running}
                            value={componentKey}
                            onChange={changeComponentKey}
                        >
                            {Object.keys(componentInfos).map((key) => (
                                <Select.Option key={key} value={key}>
                                    {componentInfos[key as keyof typeof componentInfos].name}
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
                <div className={scss.controller}>
                    <Button className={scss.button} disabled={running} onClick={optimize}>
                        Optimize
                    </Button>
                    <Button className={scss.button} disabled={running} onClick={startBenchmark}>
                        Start
                    </Button>
                    <Button className={scss.button} disabled={running} onClick={startBenchmark50}>
                        Start 50
                    </Button>
                    <Button className={scss.button} disabled={running || results.length === 0} onClick={clearResults}>
                        Clear
                    </Button>
                    <Button className={scss.button} disabled={running || results.length === 0} onClick={copyResults}>
                        Copy Results
                    </Button>
                </div>

                <ResultTable results={results} />
            </div>

            <div className={scss.test}>
                <Benchmark
                    key={`${componentKey}-${benchmarkType}-${results.length}`}
                    component={componentInfos[componentKey].component}
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
