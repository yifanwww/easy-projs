import { createTypedSelector } from '@easy/utils-redux';

import { IStoreState } from '../types';

export const useMainSelector = createTypedSelector<IStoreState>();
