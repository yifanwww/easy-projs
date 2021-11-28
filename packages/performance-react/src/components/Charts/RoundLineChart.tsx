import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useContext, useEffect, useRef } from 'react';

import { BenchmarkContext } from 'src/contexts/BenchmarkContext';

import { ChartContainer } from './ChartContainer';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export function BenchmarkLineChart(): React.ReactElement {
    const ref = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalResults } = useContext(BenchmarkContext);
    console.log(totalResults);

    useEffect(() => {
        const chart = echarts.init(ref.current!);

        chart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
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
    }, []);

    return <ChartContainer ref={ref} />;
}
