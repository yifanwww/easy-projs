import { describe, expect, it } from '@jest/globals';
import { getInitialState } from '../slice.js';
import { store } from '../store.js';

describe('Test redux store', () => {
    it('should use initial state', () => {
        expect(store.getState()).toStrictEqual(getInitialState());
    });
});
