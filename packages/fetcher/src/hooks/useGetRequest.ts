import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import type { Key, SWRConfiguration, SWRResponse } from 'swr';

import type { GetHookFetcher, HookFetcher } from './types.js';

export type GetRequestResponse<Data, Err> = SWRResponse<Data, Err> & { loading: boolean; abort: () => void };

export function useGetRequest<Data = unknown, Err = unknown>(
    fetcher: GetHookFetcher<Data>,
    config?: SWRConfiguration<Data, Err>,
): GetRequestResponse<Data, Err>;
export function useGetRequest<Data = unknown, Err = unknown>(
    key: Key,
    fetcher: HookFetcher<Data>,
    config?: SWRConfiguration<Data, Err>,
): GetRequestResponse<Data, Err>;

export function useGetRequest<Data = unknown, Err = unknown>(
    ...args:
        | [GetHookFetcher<Data>, SWRConfiguration<Data, Err>?]
        | [Key, HookFetcher<Data>, SWRConfiguration<Data, Err>?]
): GetRequestResponse<Data, Err> {
    const parseArgs = (): [Key, HookFetcher<Data>, SWRConfiguration<Data, Err>?] => {
        if (args.length === 1) {
            return [args[0].URL, args[0]];
        } else if (args.length === 2) {
            if (typeof args[1] === 'function') {
                return args as [Key, HookFetcher<Data>, SWRConfiguration<Data, Err>?];
            } else {
                const _args = args as [GetHookFetcher<Data>, SWRConfiguration<Data, Err>?];
                return [_args[0].URL, _args[0], _args[1]];
            }
        } else if (args.length === 3) {
            return args;
        } else {
            throw new Error('Cannot parse args');
        }
    };

    const [key, fetcher, config] = parseArgs();

    const acRef = useRef<AbortController>(new AbortController());

    useEffect(() => {
        acRef.current = new AbortController();
    });

    const swr = useSWR(key, () => fetcher({ signal: acRef.current.signal }), config);

    return {
        ...swr,
        loading: !swr.error && !swr.data,
        abort: acRef.current.abort.bind(acRef.current),
    };
}
