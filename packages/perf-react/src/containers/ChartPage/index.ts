import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, CanvasRenderer, GridComponent, LineChart, TooltipComponent, UniversalTransition]);

export * from './BarChartPage';
export * from './LineChartPage';
