import { useIsMounted, usePersistFn } from '@easy-pkg/hooks';
import { useCallback, useRef, useState } from 'react';

import { FetchOptions, Method } from '../fetcher';
import { HookFetcher } from './types';
import { uid } from './uid';

interface State<Data, Err> {
    data: Data | undefined;
    error: Err | undefined;
    loading: boolean;
}

export interface NonGetRequestConfiguration<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown> {
    onSuccess?: (data: Data, fetchArgs: Partial<FetchOptions<Payload>> | undefined) => void;
    onError?: (error: Err, fetchArgs: Partial<FetchOptions<Payload>> | undefined) => void;
    shouldThrowOnError?: boolean;
}

export interface NonGetRequestResponse<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown> {
    data: Data | undefined;
    error: Err | undefined;
    loading: boolean;
    execute: (payload: Payload) => Promise<Data | undefined>;
    trigger: (fetchArgs: Partial<FetchOptions<Payload>>) => Promise<Data | undefined>;
    abort: () => void;
    reset: () => void;
}

function useNonGetRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    url: string,
    fetcher: HookFetcher<Data>,
    config?: NonGetRequestConfiguration<Data, Payload, Err>,
    method?: Method,
): NonGetRequestResponse<Data, Payload, Err> {
    const { onError, onSuccess, shouldThrowOnError } = config ?? {};

    const [state, setState] = useState<State<Data, Err>>({ data: undefined, error: undefined, loading: false });

    const latestRequestRef = useRef<number>();

    const isMounted = useIsMounted();

    const abortController = new AbortController();

    const trigger = usePersistFn(async (fetchArgs: Partial<FetchOptions<Payload>>) => {
        const requestId = uid();
        latestRequestRef.current = requestId;

        const isLatest = () => latestRequestRef.current === requestId;

        if (isMounted()) {
            setState({ data: undefined, error: undefined, loading: true });
        }

        try {
            const data = await fetcher(url, { method, signal: abortController.signal, ...fetchArgs });

            if (isMounted() && isLatest()) {
                setState({ data, error: undefined, loading: false });
                onSuccess?.(data, fetchArgs);
            }

            return data;
        } catch (err) {
            if (isMounted() && isLatest()) {
                setState({ data: undefined, error: err as Err, loading: false });
                onError?.(err as Err, fetchArgs);
            }

            if (shouldThrowOnError) {
                throw err;
            }

            return undefined;
        }
    });

    const execute = useCallback((payload?: Payload) => trigger({ payload }), [trigger]);

    const reset = useCallback(() => {
        latestRequestRef.current = uid();

        if (isMounted()) {
            setState({ data: undefined, error: undefined, loading: false });
        }
    }, [isMounted]);

    return {
        ...state,
        trigger,
        execute,
        reset,
        abort: abortController.abort.bind(abortController),
    };
}

export function usePostRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    url: string,
    fetcher: HookFetcher<Data>,
    config?: NonGetRequestConfiguration<Data, Payload, Err>,
) {
    return useNonGetRequest(url, fetcher, config, 'post');
}

export function usePatchRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    url: string,
    fetcher: HookFetcher<Data>,
    config?: NonGetRequestConfiguration<Data, Payload, Err>,
) {
    return useNonGetRequest(url, fetcher, config, 'patch');
}

export function usePutRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    url: string,
    fetcher: HookFetcher<Data>,
    config?: NonGetRequestConfiguration<Data, Payload, Err>,
) {
    return useNonGetRequest(url, fetcher, config, 'put');
}

export function useDeleteRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    url: string,
    fetcher: HookFetcher<Data>,
    config?: NonGetRequestConfiguration<Data, Payload, Err>,
) {
    return useNonGetRequest(url, fetcher, config, 'delete');
}
