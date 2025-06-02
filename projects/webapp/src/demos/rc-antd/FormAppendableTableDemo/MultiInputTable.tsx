import type { FormAppendableTableItem } from '@easy-pkg/rc-antd';
import { Form, Input, Select, type TableColumnType } from 'antd';

export const MultiInputTableColumns: TableColumnType<FormAppendableTableItem>[] = [
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
