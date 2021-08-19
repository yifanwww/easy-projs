import { thunkCreatorFactory } from '#Utils/Redux';

import { IStoreState } from '../Types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
