import { useDispatchingActions, useDispatchingThunks } from 'src/Utils/Redux';

import { actions } from '../Actions';
import { thunks } from '../Thunks';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
