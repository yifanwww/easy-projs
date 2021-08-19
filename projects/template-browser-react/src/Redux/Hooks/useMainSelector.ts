import { createTypedSelector } from '#Utils/Redux';

import { IStoreState } from '../Types';

export const useMainSelector = createTypedSelector<IStoreState>();
