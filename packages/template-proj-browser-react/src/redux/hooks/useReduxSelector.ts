import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StoreState } from '../types';

export const useReduxSelector: TypedUseSelectorHook<StoreState> = useSelector;
