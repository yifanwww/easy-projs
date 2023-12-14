import { thunkCreatorFactory } from '@easy-pkg/helpers-redux';

import type { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
