import { PlusOutlined } from '@ant-design/icons';
import type { FormAppendableTableItem } from '@easy-lib/rc-antd';
import { resultifyAsync } from '@rustresult/result';
import { Button, Form, Input, Modal, Select, type FormListOperation, type TableColumnType } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export const ReadonlyMultiInputTableColumns: TableColumnType<FormAppendableTableItem>[] = [
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
];

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
            <Form form={form}>
                <Form.Item name="key" rules={[{ required: true }]}>
                    <Input placeholder="Key" />
                </Form.Item>
                <Form.Item name="operator" initialValue="==" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { label: '==', value: '==' },
                            { label: '!=', value: '!=' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="value" rules={[{ required: true }]}>
                    <Input placeholder="Value" />
                </Form.Item>
            </Form>
        </Modal>
    );
});

interface ReadonlyMultiInputTableAddButtonProps {
    onAdd?: FormListOperation['add'];
}

export function ReadonlyMultiInputTableAddButton({ onAdd }: ReadonlyMultiInputTableAddButtonProps) {
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
