import { ReduxReducer } from '@easy/utils-redux';

interface IDisplayConfig {
    clientAreaSize: IClientAreaSize;
}

export interface IStoreState {
    displayConfig: IDisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<IStoreState, Payload>;
