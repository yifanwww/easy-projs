import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import { Form, Space, Tooltip, Button } from 'antd';
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
    /**
     * The component to be rendered as the item of appendable field.
     * This prop won't be used if also provide `render`.
     */
    component?: React.JSXElementConstructor<FormAppendableListItemProps>;
    contentClassName?: string;
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
        component: Component,
        contentClassName,
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
                    <Space key={item.key} className={css.item_container} align="baseline">
                        {item}
                        {!readonly && <div className={css['item_delete-hidden']} />}
                    </Space>
                );
            }

            return ['string', 'number', 'boolean', 'undefined'].includes(typeof item) || item === null
                ? item
                : undefined;
        },
        [readonly],
    );

    const renderItems: FormListProps['children'] = useCallback(
        (fields, { add, remove }, { errors }) => {
            const fieldsLength = fields.length;
            const reachLimit = fieldsLength >= limit;

            const extraItemsBefore = renderExtraItemsBefore?.(fieldsLength)?.map(renderExtraItem);
            const extraItemsAfter = renderExtraItemsAfter?.(fieldsLength)?.map(renderExtraItem);

            const renderDeleteElement = (fieldName: number) => {
                if (readonly) return null;

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
                        className={css.item_delete}
                    />
                );
            };

            const renderAddButton = () => (
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

            const renderItem = ({ key, name: fieldName }: FormListFieldData) => (
                <Space key={key} className={css.item_container} align="baseline">
                    {render?.({ name: fieldName }, fieldsLength) ?? (Component ? <Component name={fieldName} /> : null)}
                    {renderDeleteElement(fieldName)}
                </Space>
            );

            return (
                <div className={contentClassName}>
                    {extraItemsBefore}

                    {(addButtonPosition === undefined || readonly) && fields.map(renderItem)}
                    {addButtonPosition !== undefined && !readonly && (
                        <>
                            {fields.slice(0, addButtonPosition).map(renderItem)}
                            {renderAddButton()}
                            {fields.slice(addButtonPosition).map(renderItem)}
                        </>
                    )}

                    {extraItemsAfter}

                    {addButtonPosition === undefined && !readonly && renderAddButton()}

                    <Form.ErrorList errors={errors} />
                </div>
            );
        },
        [
            Component,
            addButtonPosition,
            addText,
            addTooltip,
            contentClassName,
            disableAdd,
            disableButtonBlock,
            disableDeleteFirst,
            disabled,
            getAddValue,
            getDeletable,
            limit,
            onAdd,
            onRemoved,
            readonly,
            render,
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
