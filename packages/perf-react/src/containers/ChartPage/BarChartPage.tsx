import { Select } from 'antd';
import { BarSeriesOption, GridComponentOption, TooltipComponentOption } from 'echarts';
import * as echarts from 'echarts/core';
import { useContext, useEffect, useRef, useState } from 'react';
import { BenchmarkType } from 'react-component-benchmark';

import { BenchmarkTypes } from 'src/common/benchmark';
import { InputWrapper } from 'src/components/InputWrapper';
import { componentNames } from 'src/components/tests';
import { BenchmarkContext } from 'src/contexts/BenchmarkContext';

import scss from './Charts.module.scss';

type EChartsOption = echarts.ComposeOption<BarSeriesOption | GridComponentOption | TooltipComponentOption>;

export const BarChartPage: React.VFC = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { mount, unmount, update } = useContext(BenchmarkContext);

    const [benchmarkType, setBenchmarkType] = useState<BenchmarkTypes>('mount');

    useEffect(() => {
        const group = { mount: mount.average, unmount: unmount.average, update: update.average }[benchmarkType];

        const chart = echarts.init(ref.current!);

        const options: EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: componentNames,
            },
            yAxis: { type: 'value' },
            series: [
                {
                    name: 'Direct',
                    data: componentNames.map((name) => group[name]),
                    type: 'bar',
                    barWidth: '60%',
                },
            ],
        };

        chart.setOption(options);

        const resize = () => chart.resize();

        window.addEventListener('resize', resize);

        return () => {
            // See https://echarts.apache.org/handbook/en/concepts/chart-size/#dispose-and-rebuild-of-the-container-node
            chart.dispose();

            window.removeEventListener('resize', resize);
        };
    }, [benchmarkType, mount.average, unmount.average, update.average]);

    const changeBenchmarkType = (type: BenchmarkTypes) => setBenchmarkType(type);

    return (
        <div className={scss.root}>
            <div className={scss.container} ref={ref} />
            <div className={scss.selectorBar}>
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
};
