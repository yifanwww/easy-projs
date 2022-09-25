import { useDispatchingActions, useDispatchingThunks } from '@easy/utils-redux';

import { actions } from '../actions';
import { thunks } from '../thunks';

export const useReduxDispatchingActions = () => useDispatchingActions(actions);
export const useReduxDispatchingThunks = () => useDispatchingThunks(thunks);
