import { configureStore } from '@reduxjs/toolkit';

import { _reducer } from './slice.js';

export const store = configureStore({
    reducer: _reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
