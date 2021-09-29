import { useDispatchingActions, useDispatchingThunks } from '@package/utils-redux';

import { actions } from '../actions';
import { thunks } from '../thunks';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
