import { FormAppendableTable } from '@easy-lib/rc-antd';
import { resultifyAsync } from '@rustresult/result';
import { Button, Form, Input, Select, Space, message } from 'antd';

interface UserData {
    name?: string;
    email?: string;
    role: string;
}

export function RequiredMarkDemo() {
    const [form] = Form.useForm<UserData>();

    const handleValidate = async () => {
        const result = await resultifyAsync(form.validateFields)();
        if (result.isOk()) {
            message.success('Validation passed!');
        } else {
            message.error('Validation failed, please check the form.');
        }
    };

    return (
        <Form form={form}>
            <Form.Item label="Users">
                <FormAppendableTable<UserData>
                    name="users"
                    initialValue={[{}]}
                    columns={[
                        {
                            key: 'name',
                            title: 'Name',
                            width: '40%',
                            required: true,
                            render: (_, record) => (
                                <Form.Item
                                    name={[record.name, 'name']}
                                    rules={[{ required: true, message: 'Name is required' }]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>
                            ),
                        },
                        {
                            key: 'email',
                            title: 'Email',
                            width: '40%',
                            required: true,
                            render: (_, record) => (
                                <Form.Item
                                    name={[record.name, 'email']}
                                    rules={[{ required: true, message: 'Email is required' }]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                            ),
                        },
                        {
                            key: 'role',
                            title: 'Role',
                            width: '20%',
                            render: (_, record) => (
                                <Form.Item name={[record.name, 'role']} initialValue="user">
                                    <Select
                                        options={[
                                            { label: 'Admin', value: 'admin' },
                                            { label: 'User', value: 'user' },
                                        ]}
                                    />
                                </Form.Item>
                            ),
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" onClick={handleValidate}>
                        Validate
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
