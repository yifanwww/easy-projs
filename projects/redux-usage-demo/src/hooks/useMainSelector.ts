import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { StoreState } from '../types.js';

export const useMainSelector: TypedUseSelectorHook<StoreState> = useSelector;
