import { thunkCreatorFactory } from '@easy-pkg/utils-redux';

import { StoreState } from '../types';

export const createReduxThunk = thunkCreatorFactory<StoreState>();
