import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import { abstractFn } from '@easy-pkg/utils';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { reducer } from './reducer';
import type { RenderContextState, RenderContextUpdaters, RenderContextValue } from './types';

export function getInitialState(): RenderContextState {
    return {
        forceUpdateNumber: 0,
        selected: 0,
    };
}

function getInitialValues(): RenderContextValue {
    return {
        ...getInitialState(),
        forceUpdate: abstractFn,
        select: abstractFn,
    };
}

export const RenderContext = createContext<RenderContextValue>(getInitialValues());

export function RenderProvider({ children }: ReactChildrenProps): React.ReactNode {
    const [state, dispatch] = useImmerReducer(reducer, getInitialState());

    const updaters = useMemo<RenderContextUpdaters>(
        () => ({
            forceUpdate: () => dispatch({ type: 'forceUpdate' }),
            select: (select) => dispatch({ type: 'select', select }),
        }),
        [dispatch],
    );

    return (
        <RenderContext.Provider value={useMemo(() => ({ ...state, ...updaters }), [state, updaters])}>
            {children}
        </RenderContext.Provider>
    );
}
