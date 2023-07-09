import { thunkCreatorFactory } from '@easy-pkg/utils-redux';

import type { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
