import type { Integer } from '@easy-pkg/types/primitives';
import { assertIsNever } from '@easy-pkg/utils-browser';
import type { ImmerReducer } from 'use-immer';

import type { RenderContextState } from './types';

type RenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

export const reducer: ImmerReducer<RenderContextState, RenderAction> = (draft, action) => {
    switch (action.type) {
        case 'forceUpdate':
            draft.forceUpdateNumber++;
            break;

        case 'select':
            draft.selected = action.select;
            break;

        /* istanbul ignore next */
        default:
            assertIsNever(action);
    }
};
