import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { BenchmarkResult } from 'src/common/benchmark';

const formatNumber = (num: number) => `${num.toFixed(3)}ms`;

const columns: ColumnType<BenchmarkResult>[] = [
    { title: 'Order', dataIndex: 'order', key: 'order' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Samples', dataIndex: 'samples', key: 'samples' },
    {
        title: 'Mean',
        dataIndex: 'mean',
        key: 'mean',
        render: (num, record) => `${num.toFixed(3)}ms (±${record.stdDev.toFixed(3)}ms)`,
    },
    { title: 'Layout', dataIndex: 'layout', key: 'layout', render: formatNumber },
    { title: 'P95', dataIndex: 'p95', key: 'p95', render: formatNumber },
    { title: 'P99', dataIndex: 'p99', key: 'p99', render: formatNumber },
];

export interface IResultTableProps {
    results: BenchmarkResult[];
}

export function ResultTable(props: IResultTableProps): React.ReactElement {
    const { results } = props;

    return <Table columns={columns} dataSource={results} rowKey="order" />;
}
