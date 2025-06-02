import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { Form, Input } from 'antd';

export function SingleInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Form.Item name={[name, 'value']}>
            <Input />
        </Form.Item>
    );
}
