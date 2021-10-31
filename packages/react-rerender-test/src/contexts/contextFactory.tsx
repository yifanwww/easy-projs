/* eslint-disable @typescript-eslint/naming-convention */

import { useConst } from '@easy/hooks';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/types/types-external';
import { createContext, useReducer } from 'react';

export type ContextReducer<IContext, IReducerAction> = (state: WritableDraft<IContext>, action: IReducerAction) => void;

export interface IContextFactoryInstance<IContext, IContextUpdater> {
    Context: React.Context<IContext>;
    /**
     * The updaters will never change, feel free to add them into deps list.
     */
    ContextUpdater: React.Context<IContextUpdater>;
    Provider: React.FunctionComponent;
}

export function contextFactory<IContext extends {}, IContextUpdater extends {}, IReducerAction>(
    name: string,
    initialContext: IContext,
    initialUpdaters: IContextUpdater,
    reducer: ContextReducer<IContext, IReducerAction>,
    getUpdaters: (dispatch: React.Dispatch<IReducerAction>) => IContextUpdater,
): IContextFactoryInstance<IContext, IContextUpdater> {
    const Context = createContext<IContext>(initialContext);
    Context.displayName = `${name}Context`;

    const ContextUpdater = createContext<IContextUpdater>(initialUpdaters);
    ContextUpdater.displayName = `${name}ContextUpdater`;

    const Provider: React.FC = (props) => {
        const [context, dispatch] = useReducer<React.Reducer<IContext, IReducerAction>>(
            produce(reducer) as never,
            initialContext,
        );

        const updaters = useConst<IContextUpdater>(() => getUpdaters(dispatch));

        return (
            <ContextUpdater.Provider value={updaters}>
                <Context.Provider value={context}>{props.children}</Context.Provider>
            </ContextUpdater.Provider>
        );
    };
    Provider.displayName = `${name}Provider`;

    return { Context, ContextUpdater, Provider };
}
