import { useDispatchingActions, useDispatchingThunks } from '@easy-pkg/helpers-redux';

import { actions } from '../actions';
import { thunks } from '../thunks';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
