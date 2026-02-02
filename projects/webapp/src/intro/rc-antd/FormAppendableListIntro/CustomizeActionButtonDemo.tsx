import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormAppendableListItemProps } from '@easy-lib/rc-antd';
import { FormAppendableList } from '@easy-lib/rc-antd';
import { resultifyAsync } from '@rustresult/result';
import { Button, ConfigProvider, Flex, Form, Input, Modal, Popconfirm, Select, type FormListOperation } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export function CustomizeActionButtonDemo() {
    return (
        <Form>
            <Form.Item label="List">
                <ConfigProvider
                    theme={{
                        components: {
                            Form: { itemMarginBottom: 0 },
                        },
                    }}
                >
                    <FormAppendableList
                        name="list"
                        component={Item}
                        renderAddButton={(add) => <AddButton onAdd={add} />}
                        renderDeleteButton={(remove, fieldName) => (
                            <Popconfirm
                                title="Are you sure to delete this item?"
                                cancelText="No"
                                okText="Yes"
                                onConfirm={() => remove(fieldName)}
                            >
                                <Button type="text" icon={<MinusCircleOutlined />} />
                            </Popconfirm>
                        )}
                    />
                </ConfigProvider>
            </Form.Item>
        </Form>
    );
}

function Item({ name }: FormAppendableListItemProps) {
    return (
        <Flex gap={4} style={{ background: '#f5f5f5', borderRadius: 8, marginBottom: 4 }}>
            <Form.Item name={[name, 'key']} valuePropName="children" style={{ flex: 'auto' }}>
                <div style={{ margin: '0 8px' }} />
            </Form.Item>
            <Form.Item name={[name, 'operator']} initialValue="==" valuePropName="children" style={{ width: 100 }}>
                <div />
            </Form.Item>
            <Form.Item name={[name, 'value']} valuePropName="children" style={{ flex: 'auto' }}>
                <div style={{ margin: '0 8px' }} />
            </Form.Item>
        </Flex>
    );
}

interface FormData {
    key: string;
    operator: string;
    value: string;
}

interface AddButtonModalRef {
    open: () => void;
}

interface AddButtonModalProps {
    onOk?: (data: FormData) => void;
}

const AddButtonModal = forwardRef<AddButtonModalRef, AddButtonModalProps>(({ onOk }, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<FormData>();

    useImperativeHandle(
        ref,
        () => ({
            open: () => {
                form.resetFields();
                setOpen(true);
            },
        }),
        [form],
    );

    const handleOk = async () => {
        const validationResult = await resultifyAsync(form.validateFields)();
        if (validationResult.isErr()) {
            return;
        }

        const formData = validationResult.unwrap();
        onOk?.(formData);
        setOpen(false);
    };

    return (
        <Modal title="Add Item" okText="Confirm" open={open} onCancel={() => setOpen(false)} onOk={handleOk}>
            <Form form={form} layout="vertical">
                <Form.Item name="key" label="Key" rules={[{ required: true }]}>
                    <Input placeholder="Key" />
                </Form.Item>
                <Form.Item name="operator" label="Operator" initialValue="==" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: '==', value: '==' },
                            { label: '!=', value: '!=' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                    <Input placeholder="Value" />
                </Form.Item>
            </Form>
        </Modal>
    );
});

interface AddButtonProps {
    onAdd?: FormListOperation['add'];
}

function AddButton({ onAdd }: AddButtonProps) {
    const modalRef = useRef<AddButtonModalRef>(null);

    return (
        <>
            <Button type="dashed" block icon={<PlusOutlined />} onClick={() => modalRef.current?.open()}>
                Add
            </Button>
            <AddButtonModal ref={modalRef} onOk={(data) => onAdd?.(data)} />
        </>
    );
}
