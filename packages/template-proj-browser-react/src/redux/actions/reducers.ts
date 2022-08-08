import { ReduxReducer } from '../types';

export const _finishPreparing: ReduxReducer = (state) => {
    state.prepared = true;
};
