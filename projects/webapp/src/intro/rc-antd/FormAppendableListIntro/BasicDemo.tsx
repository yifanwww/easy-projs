import type { FormAppendableListItemProps } from '@easy-lib/rc-antd';
import { FormAppendableList } from '@easy-lib/rc-antd';
import { Form, Input } from 'antd';

export function BasicDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <FormAppendableList name="list" component={Item} />
            </Form.Item>
        </Form>
    );
}

function Item({ name }: FormAppendableListItemProps) {
    return (
        <Form.Item name={[name, 'value']}>
            <Input />
        </Form.Item>
    );
}
