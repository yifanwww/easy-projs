import { thunkCreatorFactory } from 'src/Utils/Redux';

import { IStoreState } from '../Types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
