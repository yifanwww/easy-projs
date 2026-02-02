import type { FormAppendableListItemProps } from '@easy-lib/rc-antd';
import { FormAppendableList } from '@easy-lib/rc-antd';
import { Form, Input } from 'antd';

export function BigItemDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <FormAppendableList name="list" component={BigItem} />
            </Form.Item>
        </Form>
    );
}

function BigItem({ name }: FormAppendableListItemProps) {
    return (
        <Form.Item name={[name, 'value']}>
            <Input.TextArea />
        </Form.Item>
    );
}
