import type { FormAppendableListItemProps } from '@easy-pkg/rc-antd';
import { FormAppendableList } from '@easy-pkg/rc-antd';
import { Flex, Form, Input, Select } from 'antd';

import { DemoLayout } from '../../components/DemoLayout';

import { BigInputItem } from './BigInputItem';
import { MultiInputItem, MultiInputItemHeader } from './MultiInputItem';
import { ReadonlyMultiInputItem, ReadonlyMultiInputItemAddButton } from './ReadonlyMultiInputItem';
import { SingleInputItem } from './SingleInputItem';

function TaggedInputItem({ name }: FormAppendableListItemProps) {
    return (
        <Flex gap={4}>
            <Form.Item name={[name, 'key']} style={{ flex: 'auto' }}>
                <Input addonBefore="Key" />
            </Form.Item>
            <Form.Item name={[name, 'operator']} initialValue="==" style={{ width: 100 }}>
                <Select
                    options={[
                        { label: '==', value: '==' },
                        { label: '!=', value: '!=' },
                    ]}
                />
            </Form.Item>
            <Form.Item name={[name, 'value']} style={{ flex: 'auto' }}>
                <Input addonBefore="Value" />
            </Form.Item>
        </Flex>
    );
}

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
                        addButtonOptions={{
                            render: (add) => <ReadonlyMultiInputItemAddButton onAdd={add} />,
                        }}
                        className={ReadonlyMultiInputItem.css.readonly_multi_input_item}
                    />
                </Form.Item>
            </Form>
        </DemoLayout>
    );
}
