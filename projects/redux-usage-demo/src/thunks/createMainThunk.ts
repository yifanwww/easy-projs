import { thunkCreatorFactory } from '@easy-pkg/helpers-redux';
import type { StoreState } from '../types.js';

export const createMainThunk = thunkCreatorFactory<StoreState>();
