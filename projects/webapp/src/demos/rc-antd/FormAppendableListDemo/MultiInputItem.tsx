import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Select } from 'antd';

export function MultiInputItemHeader() {
    return (
        <Flex align="center" gap={4} style={{ height: 32, marginBottom: 8 }}>
            <span style={{ flex: 'auto', width: 256 }}>Key</span>
            <span style={{ width: 100 }}>Operator</span>
            <span style={{ flex: 'auto', width: 256 }}>Value</span>
        </Flex>
    );
}

export function MultiInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Flex gap={4}>
            <Form.Item name={[name, 'key']} style={{ flex: 'auto' }}>
                <Input placeholder="Key" />
            </Form.Item>
            <Form.Item name={[name, 'operator']} initialValue="==" style={{ width: 100 }}>
                <Select
                    options={[
                        { label: '==', value: '==' },
                        { label: '!=', value: '!=' },
                    ]}
                />
            </Form.Item>
            <Form.Item name={[name, 'value']} style={{ flex: 'auto' }}>
                <Input placeholder="Value" />
            </Form.Item>
        </Flex>
    );
}
