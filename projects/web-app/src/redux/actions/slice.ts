import { omitUnderscorePrefixActions } from '@easy-pkg/utils-redux';
import { createSlice } from '@reduxjs/toolkit';

import type { StoreState } from '../types';

export function getInitialState(): StoreState {
    return {};
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {},
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
