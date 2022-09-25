import { useEffect, useRef } from 'react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

import { GetHookFetcher } from './types';

export type GetRequestResponse<Data, Err> = SWRResponse<Data, Err> & { loading: boolean; abort: () => void };

export function useGetRequest<Data = unknown, Err = unknown>(
    fetcher: GetHookFetcher<Data>,
    config?: SWRConfiguration<Data, Err>,
): GetRequestResponse<Data, Err> {
    const acRef = useRef<AbortController>(new AbortController());

    useEffect(() => {
        acRef.current = new AbortController();
    });

    const swr = useSWR(fetcher.URL, () => fetcher({ signal: acRef.current.signal }), config);

    return {
        ...swr,
        loading: !swr.error && !swr.data,
        abort: acRef.current.abort.bind(acRef.current),
    };
}
