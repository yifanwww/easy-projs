import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { Form, Input } from 'antd';

export function BigInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Form.Item name={[name, 'value']}>
            <Input.TextArea />
        </Form.Item>
    );
}
