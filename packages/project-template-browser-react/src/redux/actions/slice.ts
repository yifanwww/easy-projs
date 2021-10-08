import { omitUnderscorePrefixActions } from '@easy/utils-redux';
import { createSlice } from '@reduxjs/toolkit';

import { IStoreState } from '../types';
import { _finishPreparing, updateClientAreaSize } from './reducers.DisplayConfig';

export function getInitialState(): IStoreState {
    return {
        displayConfig: {
            clientAreaSize: { height: 720, width: 1280 },
            prepared: false,
        },
    };
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        updateClientAreaSize,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
