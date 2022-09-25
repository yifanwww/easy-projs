import { omitUnderscorePrefixActions } from '@easy-pkg/utils-redux';
import { createSlice } from '@reduxjs/toolkit';

import { StoreState } from '../types';
import { _finishPreparing } from './reducers';
import { updateClientAreaSize } from './reducers.DisplayConfig';

export function getInitialState(): StoreState {
    return {
        displayConfig: {
            clientAreaSize: { height: 720, width: 1280 },
        },
        prepared: false,
    };
}

const slice = createSlice({
    name: 'redux',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        updateClientAreaSize,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
