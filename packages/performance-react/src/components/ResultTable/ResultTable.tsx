import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useContext } from 'react';

import { BenchmarkResult } from 'src/common/benchmark';
import { BenchmarkContext, benchmarkResultSelector } from 'src/contexts/BenchmarkContext';

import { componentInfos } from '../tests';

const formatNumber = (num: number) => `${num.toFixed(3)}ms`;

const columns: ColumnType<BenchmarkResult>[] = [
    { title: 'Order', dataIndex: 'order', key: 'order' },
    { title: 'Name', dataIndex: 'name', key: 'name', render: (name) => componentInfos[name].displayName },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Samples', dataIndex: 'samples', key: 'samples' },
    {
        title: 'Mean',
        dataIndex: ['stats', 'mean'],
        key: 'mean',
        render: (num, record) => `${num.toFixed(3)}ms (±${record.stats.stdDev.toFixed(3)}ms)`,
    },
    { title: 'Layout', dataIndex: ['stats', 'layout'], key: 'layout', render: formatNumber },
    { title: 'P95', dataIndex: ['stats', 'p95'], key: 'p95', render: formatNumber },
    { title: 'P99', dataIndex: ['stats', 'p99'], key: 'p99', render: formatNumber },
];

export function ResultTable(): React.ReactElement {
    const { totalResults } = useContext(BenchmarkContext);

    return <Table columns={columns} dataSource={benchmarkResultSelector.selectAll(totalResults)} rowKey="order" />;
}
