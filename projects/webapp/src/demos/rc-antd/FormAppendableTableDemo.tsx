import type { FormAppendableTableItem } from '@easy-pkg/rc-antd';
import { FormAppendableTable } from '@easy-pkg/rc-antd';
import { Form, Input, Select, type TableColumnType } from 'antd';

import { DemoLayout } from '../components/DemoLayout';

const SingleColumn: TableColumnType<FormAppendableTableItem>[] = [
    {
        key: 'value',
        title: 'Value',
        render: (_, record) => (
            <Form.Item name={[record.name, 'value']}>
                <Input />
            </Form.Item>
        ),
    },
];

const MultiInputColumns: TableColumnType<FormAppendableTableItem>[] = [
    {
        key: 'key',
        title: 'Key',
        width: '50%',
        render: (_, record) => (
            <Form.Item name={[record.name, 'key']}>
                <Input placeholder="Key" />
            </Form.Item>
        ),
    },
    {
        key: 'operator',
        title: 'Operator',
        width: 100,
        render: (_, record) => (
            <Form.Item name={[record.name, 'operator']} initialValue="==">
                <Select
                    options={[
                        { label: '==', value: '==' },
                        { label: '!=', value: '!=' },
                    ]}
                />
            </Form.Item>
        ),
    },
    {
        key: 'value',
        title: 'Value',
        width: '50%',
        render: (_, record) => (
            <Form.Item name={[record.name, 'value']}>
                <Input placeholder="Value" />
            </Form.Item>
        ),
    },
];

export function FormAppendableTableDemo() {
    return (
        <DemoLayout>
            <h1>FormAppendableTable</h1>
            <h2>Examples</h2>
            <h3>Basic</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={SingleColumn} />
                </Form.Item>
            </Form>
            <h3>Multi Input</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={MultiInputColumns} />
                </Form.Item>
            </Form>
            <h3>Disabled</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={MultiInputColumns}
                        disabled
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Readonly</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={MultiInputColumns}
                        readonly
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Count Limit</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={MultiInputColumns} limit={3} />
                </Form.Item>
            </Form>
        </DemoLayout>
    );
}
