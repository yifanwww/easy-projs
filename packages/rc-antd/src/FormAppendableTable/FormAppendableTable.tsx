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
    /**
     * Default is `64`.
     */
    actionWidth?: number | string;
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
    /**
     * Completely customize the add button.
     */
    renderAddButton?: (add: FormListOperation['add'], fieldsLength: number) => React.ReactNode;
    /**
     * Completely customize the delete button.
     */
    renderDeleteButton?: (remove: FormListOperation['remove'], fieldName: number) => React.ReactNode;
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
        actionWidth = 64,
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
        renderAddButton: outerRenderAddButton,
        renderDeleteButton: outerRenderDeleteButton,
        rules,
    } = props;

    const { text: outerAddText = 'Add', tooltip: outerAddTooltip } = addButtonOptions ?? {};

    const renderDeleteButton = useCallback(
        (remove: FormListOperation['remove'], fieldName: number) => {
            if (outerRenderDeleteButton) return outerRenderDeleteButton(remove, fieldName);
            return (
                <Button
                    type="text"
                    disabled={disabled}
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => {
                        remove(fieldName);
                        onRemoved?.();
                    }}
                />
            );
        },
        [disabled, onRemoved, outerRenderDeleteButton],
    );

    const renderAddButton = useCallback(
        (add: FormListOperation['add'], fieldsLength: number, reachLimit: boolean) => {
            if (outerRenderAddButton) return outerRenderAddButton(add, fieldsLength);

            const addText =
                typeof outerAddText === 'function'
                    ? outerAddText(fieldsLength)
                    : `${outerAddText}${reachLimit ? ` (Reach limit ${limit})` : ''}`;
            const addTooltip: TooltipProps['title'] =
                typeof outerAddTooltip === 'function' ? outerAddTooltip(fieldsLength) : outerAddTooltip;

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
                        {addText}
                    </Button>
                </Tooltip>
            );
        },
        [disableAdd, disabled, getAddValue, limit, onAdd, outerAddText, outerAddTooltip, outerRenderAddButton],
    );

    const renderTable: FormListProps['children'] = useCallback(
        (fields, { add, remove }, { errors }) => {
            const fieldsLength = fields.length;
            const reachLimit = fieldsLength >= limit;

            const tableColumns = ArrayUtil.filterFalsy<TableColumnType<FormAppendableTableItem>>([
                ...columns,
                !readonly && {
                    key: 'action',
                    title: 'Action',
                    align: 'center',
                    width: actionWidth,
                    render: (_, record) => renderDeleteButton(remove, record.name),
                },
            ]);

            return (
                <div className={className}>
                    <Table
                        bordered={bordered}
                        columns={tableColumns}
                        dataSource={fields}
                        footer={readonly ? undefined : () => renderAddButton(add, fieldsLength, reachLimit)}
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
        [actionWidth, bordered, className, columns, limit, readonly, renderAddButton, renderDeleteButton],
    );

    return (
        <Form.List name={name} initialValue={initialValue} rules={rules}>
            {renderTable}
        </Form.List>
    );
}
