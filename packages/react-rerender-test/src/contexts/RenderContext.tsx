import { useConst } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import produce from 'immer';
import { createContext, useReducer } from 'react';
import { noop } from 'ts-essentials';

export interface IRenderContext {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface IRenderContextUpdater {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}

type IRenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

const reducer: ReactImmerReducer<IRenderContext, IRenderAction> = (state, action) => {
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
            break;
    }
};

const initialContext: IRenderContext = {
    forceUpdateNumber: 0,
    selected: 0,
};

export const RenderContext = createContext<IRenderContext>(initialContext);
export const RenderContextUpdater = createContext<IRenderContextUpdater>({ forceUpdate: noop, select: noop });

export const RenderProvider: React.FC = (props) => {
    const [context, dispatch] = useReducer(produce(reducer), initialContext);

    const updaters = useConst<IRenderContextUpdater>(() => ({
        forceUpdate: () => dispatch({ type: 'forceUpdate' }),
        select: (select) => dispatch({ type: 'select', select }),
    }));

    return (
        <RenderContextUpdater.Provider value={updaters}>
            <RenderContext.Provider value={context}>{props.children}</RenderContext.Provider>
        </RenderContextUpdater.Provider>
    );
};
