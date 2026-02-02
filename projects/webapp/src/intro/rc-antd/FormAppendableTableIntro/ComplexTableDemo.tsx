import { DeleteOutlined } from '@ant-design/icons';
import { FormAppendableTable } from '@easy-lib/rc-antd';
import { Button, Form, InputNumber } from 'antd';

interface StepConfig {
    scope?: number;
    pause?: number;
    isLast?: boolean;
}

export function ComplexTableDemo() {
    return (
        <Form>
            <Form.Item label="Table">
                <FormAppendableTable<StepConfig>
                    name="steps"
                    addButtonOptions={{ text: 'Add Step' }}
                    columns={[
                        {
                            key: 'step',
                            title: 'Step',
                            align: 'center',
                            width: 64,
                            render: (_, record) => record.name + 1,
                        },
                        {
                            key: 'scope',
                            title: 'Scope',
                            width: '50%',
                            render: (_, record) =>
                                // eslint-disable-next-line react/no-unstable-nested-components
                                watchIsLast(record.name, (isLast) =>
                                    isLast ? (
                                        <InputNumber suffix="%" disabled value={100} style={{ width: '100%' }} />
                                    ) : (
                                        <Form.Item name={[record.name, 'scope']}>
                                            <InputNumber suffix="%" min={1} max={99} style={{ width: '100%' }} />
                                        </Form.Item>
                                    ),
                                ),
                        },
                        {
                            key: 'pause',
                            title: 'When finished, pause for',
                            width: '50%',
                            render: (_, record) =>
                                watchIsLast(
                                    record.name,
                                    // eslint-disable-next-line react/no-unstable-nested-components
                                    (isLast) =>
                                        !isLast && (
                                            <Form.Item name={[record.name, 'pause']}>
                                                <InputNumber suffix="s" min={0} style={{ width: '100%' }} />
                                            </Form.Item>
                                        ),
                                ),
                        },
                    ]}
                    initialValue={[{ isLast: true }]}
                    onAdd={(add, fieldsLength) => add({}, fieldsLength - 1)}
                    renderDeleteButton={(remove, fieldName) =>
                        watchIsLast(
                            fieldName,
                            (isLast) =>
                                !isLast && (
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        onClick={() => remove(fieldName)}
                                    />
                                ),
                        )
                    }
                />
            </Form.Item>
        </Form>
    );
}

function watchIsLast(fieldName: number, render: (isLast: boolean) => React.ReactNode) {
    return (
        <Form.Item dependencies={[['steps', fieldName, 'isLast']]} noStyle>
            {({ getFieldValue }) => {
                const isLast = getFieldValue(['steps', fieldName, 'isLast']) as boolean | undefined;
                return render(!!isLast);
            }}
        </Form.Item>
    );
}
