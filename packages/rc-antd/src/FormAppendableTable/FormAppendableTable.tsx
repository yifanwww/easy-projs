import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ArrayUtil } from '@easy-pkg/utils';
import type { FormListFieldData, TableColumnType, TooltipProps } from 'antd';
import { Button, Form, Table, Tooltip } from 'antd';
import type { FormListOperation, FormListProps } from 'antd/es/form';
import { useCallback } from 'react';
import type { PartialDeep } from 'type-fest';

import css from './FormAppendableTable.module.scss';

export interface FormAppendableTableItem extends Omit<FormListFieldData, 'key'> {}

interface FormAppendableTableProps<T> extends Pick<FormListProps, 'name' | 'rules'> {
    addButtonOptions?: {
        /**
         * Default is `Add`.
         */
        text?: string | ((fieldsLength: number) => string);
        tooltip?: React.ReactNode | ((fieldsLength: number) => React.ReactNode);
    };
    bordered?: boolean;
    className?: string;
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
        bordered,
        className,
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

    const { text: outerAddText = 'Add', tooltip: outerAddTooltip } = addButtonOptions ?? {};

    const renderTable: FormListProps['children'] = useCallback(
        (fields, { add, remove }, { errors }) => {
            const fieldsLength = fields.length;
            const reachLimit = fieldsLength >= limit;

            const addText =
                typeof outerAddText === 'function'
                    ? outerAddText(fieldsLength)
                    : `${outerAddText}${reachLimit ? ` (Reach limit ${limit})` : ''}`;
            const addTooltip: TooltipProps['title'] =
                typeof outerAddTooltip === 'function' ? outerAddTooltip(fieldsLength) : outerAddTooltip;

            const tableColumns = ArrayUtil.filterFalsy<TableColumnType<FormAppendableTableItem>>([
                ...columns.map(
                    (column): TableColumnType<FormAppendableTableItem> => ({
                        ...column,
                        render: (value, record, index) => column.render?.(value, record, index),
                    }),
                ),
                !readonly && {
                    key: 'action',
                    title: 'Action',
                    align: 'center',
                    width: 64,
                    render: (_, record) => (
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
                    ),
                },
            ]);

            const renderAddButton = () => (
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
                        {addText}
                    </Button>
                </Tooltip>
            );

            return (
                <div className={className}>
                    <Table
                        bordered={bordered}
                        columns={tableColumns}
                        dataSource={fields}
                        footer={readonly ? undefined : renderAddButton}
                        pagination={false}
                        rowKey={(record) => record.name}
                        size="small"
                        tableLayout="fixed"
                        className={css.table}
                    />
                    <Form.ErrorList errors={errors} />
                </div>
            );
        },
        [
            bordered,
            className,
            columns,
            disableAdd,
            disabled,
            getAddValue,
            limit,
            onAdd,
            onRemoved,
            outerAddText,
            outerAddTooltip,
            readonly,
        ],
    );

    return (
        <Form.List name={name} initialValue={initialValue} rules={rules}>
            {renderTable}
        </Form.List>
    );
}
