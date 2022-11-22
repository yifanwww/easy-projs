import type { ImmerReducer } from '@easy-pkg/utils-react';

import type { RenderContextState } from './types';

type RenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

export const reducer: ImmerReducer<RenderContextState, RenderAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'forceUpdate':
            state.forceUpdateNumber++;
            break;

        case 'select':
            state.selected = action.select;
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
};
