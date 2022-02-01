import { _Nanosecond } from '../../types.internal';
import { getMean, getVariance } from '../tools';

describe(`test function \`${getMean.name}\``, () => {
    it('returns average value', () => {
        expect(getMean([1, 2, 3, 4, 4] as _Nanosecond[])).toBe(2.8);
    });
});

describe(`test function \`${getVariance.name}\``, () => {
    it('returns variance value', () => {
        expect(getVariance([1, 2, 3, 4, 4], 2.8)).toBe(1.7);
    });
});
