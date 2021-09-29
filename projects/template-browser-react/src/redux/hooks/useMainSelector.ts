import { createTypedSelector } from '@package/utils-redux';

import { IStoreState } from '../types';

export const useMainSelector = createTypedSelector<IStoreState>();
