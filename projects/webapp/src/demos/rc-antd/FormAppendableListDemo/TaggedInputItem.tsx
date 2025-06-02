import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Select } from 'antd';

export function TaggedInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Flex gap={4}>
            <Form.Item name={[name, 'key']} style={{ flex: 'auto' }}>
                <Input addonBefore="Key" />
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
                <Input addonBefore="Value" />
            </Form.Item>
        </Flex>
    );
}
