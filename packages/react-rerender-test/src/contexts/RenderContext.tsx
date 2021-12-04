import { useConst } from '@easy/hooks';
import { ReactImmerReducer } from '@easy/utils-react';
import { createContext } from 'react';
import { noop } from 'ts-essentials';
import { useImmerReducer } from 'use-immer';

export interface RenderContextState {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface RenderContextUpdaters {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}

type RenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

const reducer: ReactImmerReducer<RenderContextState, RenderAction> = (state, action) => {
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

const initialContext: RenderContextState = {
    forceUpdateNumber: 0,
    selected: 0,
};

export const RenderContext = createContext<RenderContextState>(initialContext);
export const RenderContextUpdater = createContext<RenderContextUpdaters>({ forceUpdate: noop, select: noop });

export const RenderProvider: React.FC = ({ children }) => {
    const [context, dispatch] = useImmerReducer(reducer, initialContext);

    const updaters = useConst<RenderContextUpdaters>(() => ({
        forceUpdate: () => dispatch({ type: 'forceUpdate' }),
        select: (select) => dispatch({ type: 'select', select }),
    }));

    return (
        <RenderContextUpdater.Provider value={updaters}>
            <RenderContext.Provider value={context}>{children}</RenderContext.Provider>
        </RenderContextUpdater.Provider>
    );
};
