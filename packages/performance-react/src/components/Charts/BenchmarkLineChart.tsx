import { Select } from 'antd';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useContext, useEffect, useRef, useState } from 'react';
import { BenchmarkType } from 'react-component-benchmark';

import { BenchmarkTypes, ComponentName } from 'src/common/benchmark';
import { BenchmarkContext, benchmarkResultSelector } from 'src/contexts/BenchmarkContext';
import { useComponentNames } from 'src/hooks';

import { InputWrapper } from '../InputWrapper';
import { componentInfos, componentNames } from '../tests';

import scss from './Charts.module.scss';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export function BenchmarkLineChart(): React.ReactElement {
    const ref = useRef<HTMLDivElement>(null);

    const { mount, unmount, update } = useContext(BenchmarkContext);

    const [benchmarkType, setBenchmarkType] = useState<BenchmarkTypes>('mount');
    const [componentName, { setComponentName }] = useComponentNames();

    useEffect(() => {
        const group = { mount, unmount, update }[benchmarkType];

        const chart = echarts.init(ref.current!);

        chart.setOption({
            xAxis: {
                type: 'category',
                data: benchmarkResultSelector.selectIds(group[componentName]),
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: benchmarkResultSelector.selectAll(group[componentName]).map((result) => result.stats.mean),
                    type: 'line',
                },
            ],
        });

        const resize = () => chart.resize();

        window.addEventListener('resize', resize);

        return () => {
            // See https://echarts.apache.org/handbook/en/concepts/chart-size/#dispose-and-rebuild-of-the-container-node
            chart.dispose();

            window.removeEventListener('resize', resize);
        };
    }, [benchmarkType, componentName, mount, unmount, update]);

    const changeComponentName = (name: ComponentName) => setComponentName(name);

    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    return (
        <div className={scss.root}>
            <div className={scss.container} ref={ref} />
            <div className={scss.selectorBar}>
                <InputWrapper className={scss.select} flexAuto title="Component">
                    <Select className={scss.select} value={componentName} onChange={changeComponentName}>
                        {componentNames.map((name) => (
                            <Select.Option key={name} value={name}>
                                {componentInfos[name].displayName}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper className={scss.select} flexAuto title="Benchmark Type">
                    <Select className={scss.select} value={benchmarkType} onChange={changeBenchmarkType}>
                        {Object.values(BenchmarkType).map((type) => (
                            <Select.Option key={type} value={type}>
                                {type}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
            </div>
        </div>
    );
}
