import { noop } from 'ts-essentials';

import { contextFactory, ContextReducer } from 'src/contexts/contextFactory';

export interface IRenderContext {
    forceUpdateNumber: Integer;
}

export interface IRenderContextUpdater {
    forceUpdate: () => void;
}

type IReducerAction = { type: 'forceUpdate' };

const reducer: ContextReducer<IRenderContext, IReducerAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'forceUpdate':
            state.forceUpdateNumber++;
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action.type;
            break;
    }
};

export const {
    Context: RenderContext,
    ContextUpdater: RenderContextUpdater,
    Provider: RenderProvider,
} = contextFactory<IRenderContext, IRenderContextUpdater, IReducerAction>(
    'Render',
    { forceUpdateNumber: 0 },
    { forceUpdate: noop },
    reducer,
    (dispatch) => ({
        forceUpdate: () => dispatch({ type: 'forceUpdate' }),
    }),
);
