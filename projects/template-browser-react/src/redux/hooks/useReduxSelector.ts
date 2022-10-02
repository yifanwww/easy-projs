import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { StoreState } from '../types';

export const useReduxSelector: TypedUseSelectorHook<StoreState> = useSelector;
