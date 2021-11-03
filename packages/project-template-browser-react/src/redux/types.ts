import { ReduxReducer } from '@easy/utils-redux';

interface IDisplayConfig {
    clientAreaSize: IClientAreaSize;
    prepared: boolean;
}

export interface IStoreState {
    displayConfig: IDisplayConfig;
}

export type MainReducer<Payload = undefined> = ReduxReducer<IStoreState, Payload>;
