import type { ClientAreaSize } from '@easy-pkg/utils-react';
import type { ReduxReducer as InternalReduxReducer } from '@easy-pkg/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type ReduxReducer<Payload = undefined> = InternalReduxReducer<StoreState, Payload>;
