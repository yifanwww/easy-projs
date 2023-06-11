import type { Integer } from '@easy-pkg/utils-type';
import type { ImmerReducer } from 'use-immer';

import type { RenderContextState } from './types';

type RenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

export const reducer: ImmerReducer<RenderContextState, RenderAction> = (draft, action) => {
    let never: never;
    switch (action.type) {
        case 'forceUpdate':
            draft.forceUpdateNumber++;
            break;

        case 'select':
            draft.selected = action.select;
            break;

        /* istanbul ignore next */
        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
};
