import { createTypedSelector } from 'src/Utils/Redux';

import { IStoreState } from '../Types';

export const useMainSelector = createTypedSelector<IStoreState>();
