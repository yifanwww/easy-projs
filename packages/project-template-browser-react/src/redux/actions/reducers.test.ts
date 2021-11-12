import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `_finishPreparing`', () => {
    it('finishes preparing', () => {
        const prevState = getInitialState();

        expect(_reducer(prevState, _actions._finishPreparing()).prepared).toMatchSnapshot();
    });
});
