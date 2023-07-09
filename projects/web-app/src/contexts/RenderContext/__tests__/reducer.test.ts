import produce from 'immer';

import { initialState } from '../context';
import { reducer } from '../reducer';

describe(`Test reducer fn \`${reducer.name}\``, () => {
    it('should increase forceUpdate count', () => {
        const reduce = produce(reducer);
        expect(reduce(initialState, { type: 'forceUpdate' })).toStrictEqual({ forceUpdateNumber: 1, selected: 0 });
    });

    it('should increase select count', () => {
        const reduce = produce(reducer);
        expect(reduce(initialState, { type: 'select', select: 5 })).toStrictEqual({
            forceUpdateNumber: 0,
            selected: 5,
        });
    });
});
