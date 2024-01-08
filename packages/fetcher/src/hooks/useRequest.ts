import { useIsMounted, usePersistFn } from '@easy-pkg/hooks';
import { useCallback, useRef, useState } from 'react';

import type { FetchOptions } from '../fetcher/index.js';

import type { HookFetcher } from './types.js';
import { uid } from './uid.js';

interface State<Data, Err> {
    data: Data | undefined;
    error: Err | undefined;
    loading: boolean;
}

export interface RequestConfiguration<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown> {
    onSuccess?: (data: Data, fetchArgs: Partial<FetchOptions<Payload>> | undefined) => void;
    onError?: (error: Err, fetchArgs: Partial<FetchOptions<Payload>> | undefined) => void;
    shouldThrowOnError?: boolean;
}

export interface RequestResponse<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown> {
    data: Data | undefined;
    error: Err | undefined;
    loading: boolean;
    execute: (payload: Payload) => Promise<Data | undefined>;
    trigger: (fetchArgs: Partial<FetchOptions<Payload>>) => Promise<Data | undefined>;
    abort: () => void;
    reset: () => void;
}

export function useRequest<Data = unknown, Payload extends BodyInit = BodyInit, Err = unknown>(
    fetcher: HookFetcher<Data>,
    config?: RequestConfiguration<Data, Payload, Err>,
): RequestResponse<Data, Payload, Err> {
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
            const data = await fetcher({ signal: abortController.signal, ...fetchArgs });

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

    const execute = useCallback((data?: Payload) => trigger({ data }), [trigger]);

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
