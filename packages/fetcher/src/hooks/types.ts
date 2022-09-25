import { FetchOptions } from '../fetcher';

export type HookFetcher<Data> = (config: FetchOptions) => Promise<Data>;

export interface GetHookFetcher<Data> extends HookFetcher<Data> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    URL: string;
}
