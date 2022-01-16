import { thunkCreatorFactory } from '@easy/utils-redux';

import { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
