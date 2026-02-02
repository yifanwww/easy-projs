import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormAppendableTable } from '@easy-lib/rc-antd';
import { resultifyAsync } from '@rustresult/result';
import { Button, Form, Input, Modal, Popconfirm, Select, type FormListOperation } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export function CustomizeActionButtonDemo() {
    return (
        <Form>
            <Form.Item label="Table">
                <FormAppendableTable
                    name="table"
                    columns={[
                        {
                            key: 'key',
                            title: 'Key',
                            width: '50%',
                            render: (_, record) => (
                                <Form.Item name={[record.name, 'key']} valuePropName="children">
                                    <div />
                                </Form.Item>
                            ),
                        },
                        {
                            key: 'operator',
                            title: 'Operator',
                            width: 100,
                            render: (_, record) => (
                                <Form.Item name={[record.name, 'operator']} initialValue="==" valuePropName="children">
                                    <div />
                                </Form.Item>
                            ),
                        },
                        {
                            key: 'value',
                            title: 'Value',
                            width: '50%',
                            render: (_, record) => (
                                <Form.Item name={[record.name, 'value']} valuePropName="children">
                                    <div />
                                </Form.Item>
                            ),
                        },
                    ]}
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
            </Form.Item>
        </Form>
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
