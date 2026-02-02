import { describe, expect, it } from '@jest/globals';
import { SelectHelper } from '../select';
import type { FieldNames } from '../types';

describe(`Test static method \`${SelectHelper.name}.${SelectHelper.mergeDefaultFieldNames.name}\``, () => {
    it('should merge default field names', () => {
        const expected: FieldNames = {
            label: 'label',
            value: 'value',
            options: 'options',
            groupLabel: 'label',
        };

        expect(SelectHelper.mergeDefaultFieldNames()).toStrictEqual(expected);
        expect(SelectHelper.mergeDefaultFieldNames({})).toStrictEqual(expected);
        expect(
            SelectHelper.mergeDefaultFieldNames({ label: 'l', value: 'v', options: 'o', groupLabel: 'l' }),
        ).toStrictEqual({ label: 'l', value: 'v', options: 'o', groupLabel: 'l' });
    });
});
