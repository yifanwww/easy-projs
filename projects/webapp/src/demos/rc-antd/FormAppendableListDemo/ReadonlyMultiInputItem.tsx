import { PlusOutlined } from '@ant-design/icons';
import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { resultifyAsync } from '@rustresult/result';
import { Button, Flex, Form, Input, Modal, Select, type FormListOperation } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import css from './ReadonlyMultiInputItem.module.scss';

export function ReadonlyMultiInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Flex
            gap={4}
            className={css.readonly_multi_input}
            style={{ background: '#f5f5f5', borderRadius: 8, marginBottom: 4 }}
        >
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
ReadonlyMultiInputItem.css = css;

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

interface ReadonlyMultiInputItemAddButtonProps {
    onAdd?: FormListOperation['add'];
}

export function ReadonlyMultiInputItemAddButton({ onAdd }: ReadonlyMultiInputItemAddButtonProps) {
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
