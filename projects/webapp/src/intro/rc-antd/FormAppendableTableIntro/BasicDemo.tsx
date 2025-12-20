import { FormAppendableTable } from '@easy-pkg/rc-antd';
import { Form, Input } from 'antd';

export function BasicDemo() {
    return (
        <Form>
            <Form.Item label="Table">
                <FormAppendableTable
                    name="table"
                    columns={[
                        {
                            key: 'value',
                            title: 'Value',
                            render: (_, record) => (
                                <Form.Item name={[record.name, 'value']}>
                                    <Input />
                                </Form.Item>
                            ),
                        },
                    ]}
                />
            </Form.Item>
        </Form>
    );
}
