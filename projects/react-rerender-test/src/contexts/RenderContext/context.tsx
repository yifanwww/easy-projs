import { abstractFn } from '@easy-pkg/utils';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { reducer } from './reducer';
import type { RenderContextState, RenderContextUpdaters } from './types';

export const initialState: RenderContextState = {
    forceUpdateNumber: 0,
    selected: 0,
};

export const RenderContext = createContext<RenderContextState>(initialState);
export const RenderContextUpdater = createContext<RenderContextUpdaters>({
    forceUpdate: abstractFn,
    select: abstractFn,
});

export const RenderProvider: React.FC = ({ children }) => {
    const [context, dispatch] = useImmerReducer(reducer, initialState);

    const updaters = useMemo<RenderContextUpdaters>(
        () => ({
            forceUpdate: () => dispatch({ type: 'forceUpdate' }),
            select: (select) => dispatch({ type: 'select', select }),
        }),
        [dispatch],
    );

    return (
        <RenderContextUpdater.Provider value={updaters}>
            <RenderContext.Provider value={context}>{children}</RenderContext.Provider>
        </RenderContextUpdater.Provider>
    );
};
