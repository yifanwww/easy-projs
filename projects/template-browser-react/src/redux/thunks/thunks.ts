import { _actions } from '../actions';

import { createReduxThunk } from './createReduxThunk';

export const prepare = createReduxThunk((dispatch) => {
    dispatch(_actions._finishPreparing());
});
