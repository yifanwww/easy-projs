import { useConst } from '@easy/hooks';
import produce from 'immer';
import { createContext, useReducer } from 'react';
import { noop } from 'ts-essentials';

import { ContextReducer } from 'src/contexts/types';

export interface IRenderContext {
    forceUpdateNumber: Integer;
}

export interface IRenderContextUpdater {
    forceUpdate: () => void;
}

const initialContext: IRenderContext = { forceUpdateNumber: 0 };

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

export const RenderContext = createContext<IRenderContext>(initialContext);

export const RenderContextUpdater = createContext<IRenderContextUpdater>({ forceUpdate: noop });

export const RenderProvider: React.FC = (props) => {
    const [context, dispatch] = useReducer(produce(reducer), initialContext);

    const updaters = useConst<IRenderContextUpdater>(() => ({
        forceUpdate: () => dispatch({ type: 'forceUpdate' }),
    }));

    return (
        <RenderContextUpdater.Provider value={updaters}>
            <RenderContext.Provider value={context}>{props.children}</RenderContext.Provider>
        </RenderContextUpdater.Provider>
    );
};
