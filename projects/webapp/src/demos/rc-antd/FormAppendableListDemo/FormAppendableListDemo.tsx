import { MinusCircleOutlined } from '@ant-design/icons';
import { FormAppendableList } from '@easy-pkg/rc-antd';
import { Button, Form, Popconfirm } from 'antd';

import { DemoLayout } from '../../components/DemoLayout';

import { BigInputItem } from './BigInputItem';
import { MultiInputItem, MultiInputItemHeader } from './MultiInputItem';
import { ReadonlyMultiInputItem, ReadonlyMultiInputItemAddButton } from './ReadonlyMultiInputItem';
import { SingleInputItem } from './SingleInputItem';
import { TaggedInputItem } from './TaggedInputItem';

export function FormAppendableListDemo() {
    return (
        <DemoLayout>
            <h1>FormAppendableList</h1>
            <h2>Examples</h2>
            <h3>Basic</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList name="list" component={SingleInputItem} />
                </Form.Item>
            </Form>
            <h3>Multi Input</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={MultiInputItem}
                        initialValue={[{ key: 'foo', operator: '==' }]}
                    />
                </Form.Item>
            </Form>
            <h3>Tagged Input</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={TaggedInputItem}
                        initialValue={[{ key: 'foo', operator: '==' }]}
                    />
                </Form.Item>
            </Form>
            <h3>Disabled</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={MultiInputItem}
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
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={MultiInputItem}
                        readonly
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Extra Items</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={MultiInputItem}
                        initialValue={[
                            { key: 'foo', operator: '==' },
                            { key: 'bar', operator: '!=' },
                        ]}
                        renderExtraItemsAfter={(fieldsLength) => [
                            <div key="count" style={{ height: 32, lineHeight: '32px', marginBottom: 8 }}>
                                Count: {fieldsLength}
                            </div>,
                        ]}
                        renderExtraItemsBefore={() => [<MultiInputItemHeader key="header" />]}
                    />
                </Form.Item>
            </Form>
            <h3>Count Limit</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={MultiInputItem}
                        limit={3}
                        renderExtraItemsAfter={(fieldsLength) => [
                            <div key="count" style={{ height: 32, lineHeight: '32px', marginBottom: 8 }}>
                                Limit is 3, count: {fieldsLength}
                            </div>,
                        ]}
                    />
                </Form.Item>
            </Form>
            <h3>Big Item</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList name="list" component={BigInputItem} />
                </Form.Item>
            </Form>
            <h3>Customize Add Button</h3>
            <Form>
                <Form.Item label="List">
                    <FormAppendableList
                        name="list"
                        component={ReadonlyMultiInputItem}
                        renderAddButton={(add) => <ReadonlyMultiInputItemAddButton onAdd={add} />}
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
                        className={ReadonlyMultiInputItem.css.readonly_multi_input_item}
                    />
                </Form.Item>
            </Form>
        </DemoLayout>
    );
}
