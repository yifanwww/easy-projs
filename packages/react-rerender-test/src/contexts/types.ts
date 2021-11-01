import { WritableDraft } from 'immer/dist/types/types-external';

export type ContextReducer<IContext, IReducerAction> = (state: WritableDraft<IContext>, action: IReducerAction) => void;
