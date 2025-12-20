import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { FormAppendableList } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Select, Space, type InputProps } from 'antd';

export function TaggedInputDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <FormAppendableList name="list" component={Item} initialValue={[{ key: 'foo', operator: '==' }]} />
            </Form.Item>
        </Form>
    );
}

function Item({ name }: FormAppendableListItemProps) {
    return (
        <Flex gap={4}>
            <Form.Item name={[name, 'key']} style={{ flex: 'auto' }}>
                <TaggedInput tag="Key" />
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
                <TaggedInput tag="Value" />
            </Form.Item>
        </Flex>
    );
}

interface TaggedInputProps extends InputProps {
    tag: string;
}

function TaggedInput({ tag, ...inputProps }: TaggedInputProps) {
    return (
        <Space.Compact style={{ width: '100%' }}>
            <Space.Addon>{tag}</Space.Addon>
            <Input {...inputProps} />
        </Space.Compact>
    );
}
