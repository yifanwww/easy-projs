import { describe, expect, it } from '@jest/globals';
import { produce } from 'immer';

import { getInitialState } from '../context';
import { reducer } from '../reducer';

describe(`Test reducer fn \`${reducer.name}\``, () => {
    it('should increase forceUpdate count', () => {
        const prevState = getInitialState();

        const reduce = produce(reducer);
        expect(reduce(prevState, { type: 'forceUpdate' })).toStrictEqual({ forceUpdateNumber: 1, selected: 0 });
    });

    it('should increase select count', () => {
        const prevState = getInitialState();

        const reduce = produce(reducer);
        expect(reduce(prevState, { type: 'select', select: 5 })).toStrictEqual({
            forceUpdateNumber: 0,
            selected: 5,
        });
    });
});
