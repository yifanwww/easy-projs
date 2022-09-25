import { FetchOptions } from '../fetcher';

export type HookFetcher<Data> = (url: string, config: FetchOptions) => Promise<Data>;
