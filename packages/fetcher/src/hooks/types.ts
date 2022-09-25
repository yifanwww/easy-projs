import { FetchOptions } from '../fetcher';

export type HookFetcher<Data> = (config: FetchOptions) => Promise<Data>;
