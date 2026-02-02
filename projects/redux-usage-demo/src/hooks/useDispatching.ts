import { useDispatchingActions, useDispatchingThunks } from '@easy-pkg/helpers-redux';
import { actions } from '../actions/index.js';
import { thunks } from '../thunks/index.js';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
