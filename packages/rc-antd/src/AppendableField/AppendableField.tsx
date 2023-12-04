import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import { Form, Space, Tooltip, Button } from 'antd';
import type { FormListProps } from 'antd/es/form';
import { useCallback } from 'react';
import { isElement } from 'react-is';
import type { PartialDeep } from 'type-fest';

import type { NamePath } from '../types';

import css from './AppendableField.module.scss';

export interface AppendableItemProps extends Omit<FormListFieldData, 'key'> {}

export interface AppendableFieldProps<T> {
    /**
     * Default is `Add`.
     */
    addText?: string;
    addTooltip?: React.ReactNode | (() => React.ReactNode);
    /**
     * The component to be rendered as the item of appendable field.
     * This prop won't be used if also provide `render`.
     */
    component?: React.JSXElementConstructor<AppendableItemProps>;
    contentClassName?: string;
    disableAdd?: boolean;
    disableButtonBlock?: boolean;
    disabled?: boolean;
    /**
     * Specifies whether it's allowed to delete the first item.
     */
    disableDeleteFirst?: boolean;
    /**
     * Get the new item to be added.
     */
    getAdd?: () => PartialDeep<T>;
    initialValue?: Partial<T>[];
    limit?: number;
    name: NamePath;
    onRemove?: () => void;
    readonly?: boolean;
    /**
     * The render function to render the items of appendable field.
     */
    render?: (props: AppendableItemProps, fieldsLength: number) => React.ReactNode;
    /**
     * The render function to render extra items of appendable field after the normal fields.
     */
    renderExtraItemsAfter?: (fieldsLength: number) => React.ReactNode[] | undefined | null;
    /**
     * The render function to render extra items of appendable field before the normal fields.
     */
    renderExtraItemsBefore?: (fieldsLength: number) => React.ReactNode[] | undefined | null;
    rules?: FormListProps['rules'];
    value?: T[];
}

/**
 * The component for appendable list of form fiels, using Form.List.
 *
 * Usage:
 * ```tsx
 * <Form.Item label={...}>
 *   <AppendableFormField name={...} component={...} />
 * </Form.Item>
 * ```
 */
export function AppendableField<T>(props: AppendableFieldProps<T>) {
    const {
        addText = 'Add',
        addTooltip,
        component: Component,
        contentClassName,
        disableAdd,
        disableButtonBlock,
        disableDeleteFirst,
        disabled,
        getAdd,
        initialValue,
        limit = Number.MAX_SAFE_INTEGER,
        name,
        onRemove,
        readonly,
        render,
        renderExtraItemsAfter,
        renderExtraItemsBefore,
        rules,
        value: values = [],
    } = props;

    const reactLimit = values.length >= limit;

    const renderExtraItem = useCallback(
        (item: React.ReactNode) => {
            if (isElement(item)) {
                return (
                    <Space key={item.key} className={css.space} align="baseline">
                        {item}
                        {!readonly && <div className={css.deleteHidden} />}
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

            const extraItemsBefore = renderExtraItemsBefore?.(fieldsLength)?.map(renderExtraItem);
            const extraItemsAfter = renderExtraItemsAfter?.(fieldsLength)?.map(renderExtraItem);

            return (
                <div className={contentClassName}>
                    {extraItemsBefore}

                    {fields.map(({ key, name: fieldName }, index) => (
                        <Space key={key} className={css.space} align="baseline">
                            {render?.({ name: fieldName }, fieldsLength) ??
                                (Component ? <Component name={fieldName} /> : null)}
                            {!readonly &&
                                (!disabled && (!disableDeleteFirst || index > 0) ? (
                                    <MinusCircleOutlined
                                        className={css.delete}
                                        onClick={() => {
                                            remove(fieldName);
                                            onRemove?.();
                                        }}
                                    />
                                ) : (
                                    <div className={css.deleteHidden} />
                                ))}
                        </Space>
                    ))}

                    {extraItemsAfter}

                    {!readonly && (
                        <Tooltip title={addTooltip}>
                            <Button
                                block={!disableButtonBlock}
                                disabled={!!disabled || !!disableAdd || reactLimit}
                                icon={<PlusOutlined />}
                                onClick={() => add(getAdd?.())}
                                type="dashed"
                            >
                                {`${addText}${reactLimit ? ` (React limit ${limit})` : ''}`}
                            </Button>
                        </Tooltip>
                    )}

                    <Form.ErrorList errors={errors} />
                </div>
            );
        },
        [
            Component,
            addText,
            addTooltip,
            contentClassName,
            disableAdd,
            disableButtonBlock,
            disableDeleteFirst,
            disabled,
            getAdd,
            limit,
            onRemove,
            reactLimit,
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
