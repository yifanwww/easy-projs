import { ReduxReducer } from '../types';

export const updateClientAreaSize: ReduxReducer<ClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;
};
