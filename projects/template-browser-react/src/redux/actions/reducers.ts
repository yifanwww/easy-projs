import type { ReduxReducer } from '../types';

export const _finishPreparing: ReduxReducer = (draft) => {
    draft.prepared = true;
};
