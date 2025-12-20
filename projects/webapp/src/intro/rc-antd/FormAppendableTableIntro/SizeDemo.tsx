import { FormAppendableTable } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Radio, Select } from 'antd';
import { useState } from 'react';

type SizeType = 'small' | 'middle' | 'large';

export function SizeDemo() {
    const [size, setSize] = useState<SizeType>('middle');

    return (
        <Flex vertical gap={16}>
            <Radio.Group
                options={[
                    { label: 'Small', value: 'small' },
                    { label: 'Middle', value: 'middle' },
                    { label: 'Large', value: 'large' },
                ]}
                optionType="button"
                value={size}
                onChange={(e) => setSize(e.target.value as SizeType)}
            />
            <Form size={size}>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
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
                    />
                </Form.Item>
            </Form>
        </Flex>
    );
}
