import { thunkCreatorFactory } from '@easy/utils-redux';

import { IStoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
