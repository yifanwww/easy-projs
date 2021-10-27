import { createContext, useReducer } from 'react';
import { noop } from 'ts-essentials';

import { PageKey } from 'src/common';
import { useConst } from '@fluentui/react-hooks';

export interface IPageContext {
    pageKey: Optional<PageKey>;
}

export interface IPageContextUpdater {
    setPageKey: React.Dispatch<PageKey>;
}

type IReducerAction = { type: 'setPageKey'; pageKey: PageKey };

const reducer: React.Reducer<IPageContext, IReducerAction> = (state, action) => {
    switch (action.type) {
        case 'setPageKey':
            return action.pageKey === state.pageKey ? state : { ...state, pageKey: action.pageKey };

        default:
            return state;
    }
};

const initialContext: IPageContext = { pageKey: null };

export const PageContext = createContext<IPageContext>(initialContext);

/**
 * The updaters will never change, feel free to add them into deps list.
 */
export const PageContextUpdater = createContext<IPageContextUpdater>({ setPageKey: noop });

export function PageProvider(props: Readonly<IChildrenProps>): React.ReactElement {
    const [context, dispatch] = useReducer(reducer, initialContext);

    const updaters = useConst<IPageContextUpdater>(() => ({
        setPageKey: (pageKey) => dispatch({ type: 'setPageKey', pageKey }),
    }));

    return (
        <PageContextUpdater.Provider value={updaters}>
            <PageContext.Provider value={context}>{props.children}</PageContext.Provider>
        </PageContextUpdater.Provider>
    );
}
