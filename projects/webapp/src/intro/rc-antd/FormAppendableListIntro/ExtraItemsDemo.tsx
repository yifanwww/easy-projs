import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { FormAppendableList } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Select } from 'antd';

export function ExtraItemsDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <FormAppendableList
                    name="list"
                    component={Item}
                    initialValue={[
                        { key: 'foo', operator: '==' },
                        { key: 'bar', operator: '!=' },
                    ]}
                    renderExtraItemsAfter={(fieldsLength) => [
                        <div key="count" style={{ height: 32, lineHeight: '32px', marginBottom: 8 }}>
                            Count: {fieldsLength}
                        </div>,
                    ]}
                    renderExtraItemsBefore={() => [<Header key="header" />]}
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

function Header() {
    return (
        <Flex align="center" gap={4} style={{ height: 32, marginBottom: 8 }}>
            <span style={{ flex: 'auto', width: 256 }}>Key</span>
            <span style={{ width: 100 }}>Operator</span>
            <span style={{ flex: 'auto', width: 256 }}>Value</span>
        </Flex>
    );
}
