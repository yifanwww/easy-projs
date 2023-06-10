import type { FieldNames } from 'rc-select/lib/Select';

import { SelectUtil } from '../select';

describe(`Test static method \`${SelectUtil.name}.${SelectUtil.mergeDefaultFieldNames.name}\``, () => {
    it('should merge default field names', () => {
        const expected: FieldNames = {
            label: 'label',
            options: 'options',
            value: 'value',
        };

        expect(SelectUtil.mergeDefaultFieldNames()).toStrictEqual(expected);
        expect(SelectUtil.mergeDefaultFieldNames({})).toStrictEqual(expected);
        expect(SelectUtil.mergeDefaultFieldNames({ label: 'l', value: 'v', options: 'o' })).toStrictEqual({
            label: 'l',
            value: 'v',
            options: 'o',
        });
    });
});
