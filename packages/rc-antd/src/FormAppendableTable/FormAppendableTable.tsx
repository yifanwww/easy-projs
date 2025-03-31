import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ArrayUtil } from '@easy-pkg/utils';
import { Button, Form, Table, Tooltip, type FormListFieldData, type TableColumnType } from 'antd';
import type { FormListOperation, FormListProps } from 'antd/es/form';
import { useCallback } from 'react';
import type { PartialDeep } from 'type-fest';

import css from './FormAppendableTable.module.scss';

export interface FormAppendableTableItem extends Omit<FormListFieldData, 'key'> {}

type InternalTableItem = ({ type: 'data' } & FormAppendableTableItem) | { type: 'add-button' };

interface FormAppendableTableProps<T> extends Pick<FormListProps, 'name' | 'rules'> {
    addButtonOptions?: {
        /**
         * Default is `Add`.
         */
        text?: string;
        tooltip?: React.ReactNode | (() => React.ReactNode);
    };
    columns: TableColumnType<FormAppendableTableItem>[];
    disableAdd?: boolean;
    disabled?: boolean;
    /**
     * Get the new item to be added.
     */
    getAddValue?: () => PartialDeep<T>;
    initialValue?: Partial<T>[];
    limit?: number;
    /**
     * Customized how to add a new item. This takes higher priority than `getAdd`.
     */
    onAdd?: (add: FormListOperation['add'], fieldsLength: number) => void;
    onRemoved?: () => void;
    readonly?: boolean;
}

/**
 * The component for appendable table of form fields, using Form.List.
 *
 * Usage:
 * ```tsx
 * <Form.Item label={...}>
 *   <FormAppendableTable name={...} columns={...} />
 * </Form.Item>
 * ```
 */
export function FormAppendableTable<T>(props: FormAppendableTableProps<T>) {
    const {
        addButtonOptions,
        columns,
        disableAdd,
        disabled,
        getAddValue,
        initialValue,
        limit = Number.MAX_SAFE_INTEGER,
        name,
        onAdd,
        onRemoved,
        readonly,
        rules,
    } = props;

    const { text: addText = 'Add', tooltip: addTooltip } = addButtonOptions ?? {};

    const renderTable: FormListProps['children'] = useCallback(
        (fields, { add, remove }, { errors }) => {
            const fieldsLength = fields.length;
            const reachLimit = fieldsLength >= limit;

            const tableColumns = ArrayUtil.filterFalsy<TableColumnType<InternalTableItem>>([
                ...(columns as unknown as TableColumnType<InternalTableItem>[]).map(
                    (column, colIndex): TableColumnType<InternalTableItem> => ({
                        ...column,
                        onCell: (record) => {
                            if (record.type === 'add-button') {
                                return { colSpan: colIndex === 0 ? columns.length + 1 : 0 };
                            }
                            return { colSpan: 1 };
                        },
                        render: (value, record, index) => {
                            if (record.type === 'add-button' && colIndex !== 0) return null;

                            if (record.type === 'add-button') {
                                return (
                                    <Tooltip title={addTooltip}>
                                        <Button
                                            type="dashed"
                                            block
                                            disabled={!!disabled || !!disableAdd || reachLimit}
                                            icon={<PlusOutlined />}
                                            onClick={() => {
                                                if (onAdd) {
                                                    onAdd(add, fieldsLength);
                                                } else {
                                                    add(getAddValue?.());
                                                }
                                            }}
                                        >
                                            {`${addText}${reachLimit ? ` (Reach limit ${limit})` : ''}`}
                                        </Button>
                                    </Tooltip>
                                );
                            }
                            return column.render?.(value, record, index);
                        },
                    }),
                ),
                !readonly && {
                    key: 'action',
                    title: 'Action',
                    align: 'center',
                    width: 64,
                    onCell: (record) => ({ colSpan: record.type === 'add-button' ? 0 : 1 }),
                    render: (_, record) => {
                        if (record.type === 'add-button') return null;
                        return (
                            <Button
                                type="text"
                                disabled={disabled}
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={() => {
                                    remove(record.name);
                                    onRemoved?.();
                                }}
                            />
                        );
                    },
                },
            ]);

            const dataSource = ArrayUtil.filterFalsy<InternalTableItem>([
                ...fields.map((field): InternalTableItem => ({ ...field, type: 'data' })),
                !readonly && { type: 'add-button' },
            ]);

            return (
                <div>
                    <Table
                        columns={tableColumns}
                        dataSource={dataSource}
                        pagination={false}
                        rowKey={(record) =>
                            record.type === 'add-button' ? record.type : record.type + record.name.toString()
                        }
                        size="small"
                        tableLayout="fixed"
                        className={css.table}
                    />
                    <Form.ErrorList errors={errors} />
                </div>
            );
        },
        [addText, addTooltip, columns, disableAdd, disabled, getAddValue, limit, onAdd, onRemoved, readonly],
    );

    return (
        <Form.List name={name} initialValue={initialValue} rules={rules}>
            {renderTable}
        </Form.List>
    );
}
