import type { FormAppendableListItemProps } from '@easy-lib/rc-antd';
import { FormAppendableList } from '@easy-lib/rc-antd';
import { Flex, Form, Input, Select } from 'antd';

export function DisabledDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <FormAppendableList
                    name="list"
                    component={Item}
                    disabled
                    initialValue={[
                        { key: 'foo', operator: '==' },
                        { key: 'bar', operator: '!=' },
                    ]}
                />
            </Form.Item>
        </Form>
    );
}

function Item({ name }: FormAppendableListItemProps) {
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
