import { describe, expect, it } from '@jest/globals';

import { Uint8ArrayUtil } from '../Uint8Array.js';

describe(`Test static method \`${Uint8ArrayUtil.name}.${Uint8ArrayUtil.merge.name}\``, () => {
    it('should merge multiple uint8 arrays', () => {
        expect(Uint8ArrayUtil.merge([])).toStrictEqual(new Uint8Array());
        expect(Uint8ArrayUtil.merge([new Uint8Array([1, 2, 3])])).toStrictEqual(new Uint8Array([1, 2, 3]));
        expect(
            Uint8ArrayUtil.merge([
                new Uint8Array([1, 2, 3]),
                new Uint8Array([4, 5, 6]),
                new Uint8Array([7, 8, 9]),
                new Uint8Array([10]),
            ]),
        ).toStrictEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    });
});
