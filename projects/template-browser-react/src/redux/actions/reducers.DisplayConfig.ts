import type { ClientAreaSize } from '@easy-pkg/utils-react';

import type { ReduxReducer } from '../types';

export const updateClientAreaSize: ReduxReducer<ClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;
};
