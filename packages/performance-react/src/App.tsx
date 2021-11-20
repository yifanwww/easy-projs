import { Button, InputNumber, Select } from 'antd';
import { useReducer, useRef, useState } from 'react';
import Benchmark, { BenchmarkType, BenchmarkRef, BenchResultsType } from 'react-component-benchmark';

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
    const [benchmarkType, setBenchmarkType] = useState<BenchmarkTypes>(BenchmarkType.MOUNT);
    const [componentKey, setComponentKey] = useState<string>(Object.keys(componentInfos)[0]);
    const [samples, setSamples] = useState(100);
    const [running, setRunning] = useState(false);
    const [results, dispatch] = useReducer(reducer, []);

    const finishBenchmark = (result: BenchResultsType) => {
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
        setRunning(false);
    };

    const startBenchmark = () => {
        setRunning(true);
        benchmarkRef.current?.start();
    };

    const clearResults = () => dispatch('clear');

    const changeComponentKey = (key: string) => setComponentKey(key);

    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    const changeSamples = (value: number) => setSamples(value);

    return (
        <div className={scss.root}>
            <div className={scss.display}>
                <div className={scss.controller}>
                    <InputWrapper flexAuto title="Component">
                        <Select disabled={running} value={componentKey} onChange={changeComponentKey}>
                            {Object.keys(componentInfos).map((key) => (
                                <Select.Option key={key} value={key}>
                                    {componentInfos[key as keyof typeof componentInfos].name}
                                </Select.Option>
                            ))}
                        </Select>
                    </InputWrapper>
                    <InputWrapper flexAuto title="Benchmark Type">
                        <Select disabled={running} value={benchmarkType} onChange={changeBenchmarkType}>
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
                    <InputWrapper>
                        <Button className={scss.button} disabled={running} onClick={startBenchmark}>
                            Start
                        </Button>
                    </InputWrapper>
                    <InputWrapper>
                        <Button
                            className={scss.button}
                            disabled={running || results.length === 0}
                            onClick={clearResults}
                        >
                            Clear
                        </Button>
                    </InputWrapper>
                </div>

                <ResultTable results={results} />
            </div>

            <div className={scss.test}>
                <Benchmark
                    key={`${componentKey}-${benchmarkType}-${results.length}`}
                    component={componentInfos[componentKey].component}
                    includeLayout
                    onComplete={finishBenchmark}
                    ref={benchmarkRef}
                    samples={samples}
                    timeout={10000}
                    type={benchmarkType}
                />
            </div>
        </div>
    );
}
