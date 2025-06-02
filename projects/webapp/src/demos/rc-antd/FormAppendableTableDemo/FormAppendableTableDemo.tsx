import { FormAppendableTable } from '@easy-pkg/rc-antd';
import { Form } from 'antd';

import { DemoLayout } from '../../components/DemoLayout';

import { MultiInputTableColumns } from './MultiInputTable';
import { ReadonlyMultiInputTableAddButton, ReadonlyMultiInputTableColumns } from './ReadonlyMultiInputTable';
import { SimpleTableColumns } from './SimpleTable';

export function FormAppendableTableDemo() {
    return (
        <DemoLayout>
            <h1>FormAppendableTable</h1>
            <h2>Examples</h2>
            <h3>Basic</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={SimpleTableColumns} />
                </Form.Item>
            </Form>
            <h3>Multi Input</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={MultiInputTableColumns} />
                </Form.Item>
            </Form>
            <h3>Bordered</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        bordered
                        columns={MultiInputTableColumns}
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Disabled</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={MultiInputTableColumns}
                        disabled
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Readonly</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={MultiInputTableColumns}
                        readonly
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Count Limit</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable name="table" columns={MultiInputTableColumns} limit={3} />
                </Form.Item>
            </Form>
            <h3>Customize Add Button Text</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={MultiInputTableColumns}
                        addButtonOptions={{
                            text: (fieldsLength) => `Add (${fieldsLength}/3)`,
                        }}
                        limit={3}
                    />
                </Form.Item>
            </Form>
            <h3>Customize Add Button</h3>
            <Form>
                <Form.Item label="Table">
                    <FormAppendableTable
                        name="table"
                        columns={ReadonlyMultiInputTableColumns}
                        addButtonOptions={{ render: (add) => <ReadonlyMultiInputTableAddButton onAdd={add} /> }}
                    />
                </Form.Item>
            </Form>
        </DemoLayout>
    );
}
