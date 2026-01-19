import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import { Form, Tooltip, Button } from 'antd';
import type { FormListOperation, FormListProps } from 'antd/es/form';
import { useCallback } from 'react';
import { isElement } from 'react-is';
import type { PartialDeep } from 'type-fest';

import css from './FormAppendableList.module.scss';

export interface FormAppendableListItemProps extends Omit<FormListFieldData, 'key'> {}

interface FormAppendableListProps<T> extends Pick<FormListProps, 'name' | 'rules'> {
    addButtonOptions?: {
        disableBlock?: boolean;
        /**
         * Changes the position of add button.
         * The add button will be placed after [n-th] item if positive number or zero,
         * otherwise it will be placed before [(length - abs(n))-th] item.
         */
        position?: number;
        /**
         * Default is `Add`.
         */
        text?: string;
        tooltip?: React.ReactNode | (() => React.ReactNode);
    };
    className?: string;
    /**
     * The component to be rendered as the item of appendable field.
     * This prop won't be used if also provide `render`.
     */
    component?: React.JSXElementConstructor<FormAppendableListItemProps>;
    disableAdd?: boolean;
    disabled?: boolean;
    /**
     * Specifies whether it's allowed to delete the first item.
     */
    disableDeleteFirst?: boolean;
    /**
     * Get the new item to be added.
     */
    getAddValue?: () => PartialDeep<T>;
    /**
     * Specifies if a list field is deletable.
     */
    getDeletable?: (fieldName: number, fieldsLength: number) => boolean;
    initialValue?: Partial<T>[];
    limit?: number;
    /**
     * Customized how to add a new item. This takes higher priority than `getAdd`.
     */
    onAdd?: (add: FormListOperation['add'], fieldsLength: number) => void;
    onRemoved?: () => void;
    readonly?: boolean;
    /**
     * The render function to render the items of appendable list.
     */
    render?: (props: FormAppendableListItemProps, fieldsLength: number) => React.ReactNode;
    /**
     * Completely customize the add button.
     */
    renderAddButton?: (add: FormListOperation['add'], fieldsLength: number) => React.ReactNode;
    /**
     * Completely customize the delete button.
     */
    renderDeleteButton?: (remove: FormListOperation['remove'], fieldName: number) => React.ReactNode;
    /**
     * The render function to render extra items of appendable list after the normal fields.
     */
    renderExtraItemsAfter?: (fieldsLength: number) => React.ReactNode[] | undefined | null;
    /**
     * The render function to render extra items of appendable list before the normal fields.
     */
    renderExtraItemsBefore?: (fieldsLength: number) => React.ReactNode[] | undefined | null;
}

/**
 * The component for appendable list of form fields, using Form.List.
 *
 * Usage:
 * ```tsx
 * <Form.Item label={...}>
 *   <FormAppendableList name={...} component={...} />
 * </Form.Item>
 * ```
 */
export function FormAppendableList<T>(props: FormAppendableListProps<T>) {
    const {
        addButtonOptions,
        className,
        component: Component,
        disableAdd,
        disableDeleteFirst,
        disabled,
        getAddValue,
        getDeletable,
        initialValue,
        limit = Number.MAX_SAFE_INTEGER,
        name,
        onAdd,
        onRemoved,
        readonly,
        render,
        renderAddButton: outerRenderAddButton,
        renderDeleteButton: outerRenderDeleteButton,
        renderExtraItemsAfter,
        renderExtraItemsBefore,
        rules,
    } = props;

    const {
        disableBlock: disableButtonBlock,
        position: addButtonPosition,
        text: addText = 'Add',
        tooltip: addTooltip,
    } = addButtonOptions ?? {};

    const renderExtraItem = useCallback(
        (item: React.ReactNode) => {
            if (isElement(item)) {
                return (
                    <div key={item.key} className={css.item_container}>
                        <div className={css.item_input}>{item}</div>
                        {!readonly && <div className={css.item_hidden_delete} />}
                    </div>
                );
            }

            return ['string', 'number', 'boolean', 'undefined'].includes(typeof item) || item === null
                ? item
                : undefined;
        },
        [readonly],
    );

    const renderAddButton = useCallback(
        (add: FormListOperation['add'], fieldsLength: number, reachLimit: boolean) => {
            if (outerRenderAddButton) return outerRenderAddButton(add, fieldsLength);
            return (
                <Tooltip title={addTooltip}>
                    <Button
                        block={!disableButtonBlock}
                        disabled={!!disabled || !!disableAdd || reachLimit}
                        icon={<PlusOutlined />}
                        onClick={() => {
                            if (onAdd) {
                                onAdd(add, fieldsLength);
                            } else {
                                add(getAddValue?.());
                            }
                        }}
                        type="dashed"
                        style={{ marginBottom: addButtonPosition !== undefined ? 8 : undefined }}
                    >
                        {`${addText}${reachLimit ? ` (Reach limit ${limit})` : ''}`}
                    </Button>
                </Tooltip>
            );
        },
        [
            addButtonPosition,
            addText,
            addTooltip,
            disableAdd,
            disableButtonBlock,
            disabled,
            getAddValue,
            limit,
            onAdd,
            outerRenderAddButton,
        ],
    );

    const renderDeleteButton = useCallback(
        (remove: FormListOperation['remove'], fieldName: number, fieldsLength: number) => {
            if (outerRenderDeleteButton) return outerRenderDeleteButton(remove, fieldName);
            return (
                <Button
                    type="text"
                    disabled={
                        !!disabled ||
                        !!getDeletable?.(fieldName, fieldsLength) ||
                        (!!disableDeleteFirst && fieldName === 0)
                    }
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                        remove(fieldName);
                        onRemoved?.();
                    }}
                />
            );
        },
        [disableDeleteFirst, disabled, getDeletable, onRemoved, outerRenderDeleteButton],
    );

    const renderItems: FormListProps['children'] = useCallback(
        (fields, { add, remove }, { errors }) => {
            const fieldsLength = fields.length;
            const reachLimit = fieldsLength >= limit;

            const extraItemsBefore = renderExtraItemsBefore?.(fieldsLength)?.map(renderExtraItem);
            const extraItemsAfter = renderExtraItemsAfter?.(fieldsLength)?.map(renderExtraItem);

            const renderItem = ({ key, name: fieldName }: FormListFieldData) => (
                <div key={key} className={css.item_container}>
                    <div className={css.item_input}>
                        {render?.({ name: fieldName }, fieldsLength) ??
                            (Component ? <Component name={fieldName} /> : null)}
                    </div>
                    {!readonly && (
                        <Form.Item className={css.item_delete_container}>
                            {renderDeleteButton(remove, fieldName, fieldsLength)}
                        </Form.Item>
                    )}
                </div>
            );

            return (
                <div className={className}>
                    {extraItemsBefore}

                    {(addButtonPosition === undefined || !!readonly) && fields.map(renderItem)}
                    {addButtonPosition !== undefined && !readonly && (
                        <>
                            {fields.slice(0, addButtonPosition).map(renderItem)}
                            {renderAddButton(add, fieldsLength, reachLimit)}
                            {fields.slice(addButtonPosition).map(renderItem)}
                        </>
                    )}

                    {extraItemsAfter}

                    {addButtonPosition === undefined && !readonly && renderAddButton(add, fieldsLength, reachLimit)}

                    <Form.ErrorList errors={errors} />
                </div>
            );
        },
        [
            Component,
            addButtonPosition,
            className,
            limit,
            readonly,
            render,
            renderAddButton,
            renderDeleteButton,
            renderExtraItem,
            renderExtraItemsAfter,
            renderExtraItemsBefore,
        ],
    );

    return (
        <Form.List name={name} initialValue={initialValue} rules={rules}>
            {renderItems}
        </Form.List>
    );
}
