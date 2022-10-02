import { useConst } from '@easy-pkg/hooks';
import { abstractFn } from '@easy-pkg/utils';
import { useImmerReducer } from '@easy-pkg/utils-react';
import type { ImmerReducer } from '@easy-pkg/utils-react';
import { createContext } from 'react';

export interface RenderContextState {
    forceUpdateNumber: Integer;
    selected: Integer;
}

export interface RenderContextUpdaters {
    forceUpdate: () => void;
    select: (select: Integer) => void;
}

type RenderAction = { type: 'forceUpdate' } | { type: 'select'; select: Integer };

const reducer: ImmerReducer<RenderContextState, RenderAction> = (state, action) => {
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
export const RenderContextUpdater = createContext<RenderContextUpdaters>({
    forceUpdate: abstractFn,
    select: abstractFn,
});

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
