import type { ReduxReducer } from '@easy-pkg/helpers-redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreState {}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
