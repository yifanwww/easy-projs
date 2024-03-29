import { describe, expect, it } from '@jest/globals';

import { SelectUtil } from '../select';
import type { FieldNames } from '../types';

describe(`Test static method \`${SelectUtil.name}.${SelectUtil.mergeDefaultFieldNames.name}\``, () => {
    it('should merge default field names', () => {
        const expected: FieldNames = {
            label: 'label',
            value: 'value',
            options: 'options',
            groupLabel: 'label',
        };

        expect(SelectUtil.mergeDefaultFieldNames()).toStrictEqual(expected);
        expect(SelectUtil.mergeDefaultFieldNames({})).toStrictEqual(expected);
        expect(
            SelectUtil.mergeDefaultFieldNames({ label: 'l', value: 'v', options: 'o', groupLabel: 'l' }),
        ).toStrictEqual({ label: 'l', value: 'v', options: 'o', groupLabel: 'l' });
    });
});
