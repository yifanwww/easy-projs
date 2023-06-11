import type { ClientAreaSize } from '@easy-pkg/utils-react';

import type { ReduxReducer } from '../types';

export const updateClientAreaSize: ReduxReducer<ClientAreaSize> = (draft, action) => {
    draft.displayConfig.clientAreaSize = action.payload;
};
