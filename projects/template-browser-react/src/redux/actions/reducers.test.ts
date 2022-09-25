import { expectSnapshot } from '@easy-pkg/utils-test';

import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `_finishPreparing`', () => {
    it('finishes preparing', () => {
        const prevState = getInitialState();

        expectSnapshot(_reducer(prevState, _actions._finishPreparing()).prepared);
    });
});
