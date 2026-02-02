import { thunkCreatorFactory } from '@easy-lib/helpers-redux';
import type { StoreState } from '../types.js';

export const createMainThunk = thunkCreatorFactory<StoreState>();
