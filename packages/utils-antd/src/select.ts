import type { FieldNames } from 'rc-select/lib/Select';

export class SelectUtil {
    /**
     * Refer to https://ant.design/components/select#select-props for more information.
     */
    static mergeDefaultFieldNames(fieldNames?: FieldNames): Required<FieldNames> {
        return {
            label: fieldNames?.label ?? 'label',
            options: fieldNames?.options ?? 'options',
            value: fieldNames?.value ?? 'value',
        };
    }
}
