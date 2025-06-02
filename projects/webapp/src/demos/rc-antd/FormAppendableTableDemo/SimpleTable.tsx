import type { FormAppendableTableItem } from '@easy-pkg/rc-antd';
import { Form, Input, type TableColumnType } from 'antd';

export const SimpleTableColumns: TableColumnType<FormAppendableTableItem>[] = [
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
