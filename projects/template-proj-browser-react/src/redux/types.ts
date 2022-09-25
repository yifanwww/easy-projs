import { ReduxReducer as InternalReduxReducer } from '@easy/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type ReduxReducer<Payload = undefined> = InternalReduxReducer<StoreState, Payload>;
