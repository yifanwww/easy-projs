import { useEffect, useRef } from 'react';
import useSWR, { Key, SWRConfiguration, SWRResponse } from 'swr';

import { HookFetcher } from './types';

export type GetRequestResponse<Data, Err> = SWRResponse<Data, Err> & { loading: boolean; abort: () => void };

export function useGetRequest<Data = unknown, Err = unknown>(
    key: Key,
    fetcher: HookFetcher<Data>,
    config?: SWRConfiguration<Data, Err>,
): GetRequestResponse<Data, Err> {
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
