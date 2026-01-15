import { Input, InputNumber } from 'antd';
import { useContext } from 'react';

import { ReadonlyableContext } from './ReadonlyableContext';

export interface ReadonlyableProps {
    /**
     * Default is `false`.
     */
    readonly?: boolean;
    /**
     * By default, use the value of `defaultReadonlyField` as the readonly field.
     */
    readonlyField?: string;
}

export interface ReadonlyableOptions<T> {
    /**
     * Default is `value`.
     */
    defaultReadonlyField?: string;
    renderReadonlyValue?: (value: T) => React.ReactNode;
}

export function Readonlyable<T>(component: React.ComponentType<T>, options?: ReadonlyableOptions<T>) {
    const Component = component;
    const defaultReadonlyField = options?.defaultReadonlyField ?? 'value';
    const renderReadonlyValue = options?.renderReadonlyValue;

    function ReadonlyableComponent(props: T & ReadonlyableProps) {
        const typedProps = props as Record<string, unknown> & ReadonlyableProps;
        const { readonly: outerReadonly, readonlyField = defaultReadonlyField, ...restProps } = typedProps;

        const contextValue = useContext(ReadonlyableContext);

        const readonly = outerReadonly ?? contextValue?.readonly ?? false;

        return readonly ? (
            <span>
                {renderReadonlyValue
                    ? renderReadonlyValue(typedProps[readonlyField] as T)
                    : (typedProps[readonlyField] as React.ReactNode)}
            </span>
        ) : (
            <Component {...(restProps as T & React.JSX.IntrinsicAttributes)} />
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        const componentName = Component.displayName ?? Component.name;
        if (componentName) {
            ReadonlyableComponent.displayName = `Readonlyable${componentName}`;
        }
    }

    return ReadonlyableComponent;
}

Readonlyable.Input = Readonlyable(Input);
Readonlyable.InputNumber = Readonlyable(InputNumber);
