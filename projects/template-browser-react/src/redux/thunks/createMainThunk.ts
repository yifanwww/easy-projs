import { thunkCreatorFactory } from '@package/utils-redux';

import { IStoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
