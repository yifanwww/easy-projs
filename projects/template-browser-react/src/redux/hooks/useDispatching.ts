import { useDispatchingActions, useDispatchingThunks } from '@easy-pkg/utils-redux';

import { actions } from '../actions';
import { thunks } from '../thunks';

export const useReduxDispatchingActions = () => useDispatchingActions(actions);
export const useReduxDispatchingThunks = () => useDispatchingThunks(thunks);
