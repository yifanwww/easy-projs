import type { FieldNames } from './types';

export class SelectUtil {
    /**
     * Refer to https://ant.design/components/select#select-props for more information.
     */
    static mergeDefaultFieldNames(fieldNames?: FieldNames): Required<FieldNames> {
        return {
            label: fieldNames?.label ?? 'label',
            value: fieldNames?.value ?? 'value',
            options: fieldNames?.options ?? 'options',
            groupLabel: fieldNames?.groupLabel ?? 'label',
        };
    }
}
