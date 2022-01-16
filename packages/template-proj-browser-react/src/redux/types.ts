import { ReduxReducer } from '@easy/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
