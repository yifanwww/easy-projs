import { FormAppendableTable } from '@easy-lib/rc-antd';
import { Form, Input, Select } from 'antd';

export function BorderedDemo() {
    return (
        <Form>
            <Form.Item label="Table">
                <FormAppendableTable
                    name="table"
                    bordered
                    columns={[
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
                    ]}
                    initialValue={[
                        { key: 'foo', operator: '==' },
                        { key: 'bar', operator: '!=' },
                    ]}
                />
            </Form.Item>
        </Form>
    );
}
