import { buildQueryURL } from '@easy-pkg/utils-browser';
import type { Result, ResultAsync } from 'rustlike-result';
import { Err, Ok, fromPromiseableResult, resultifyAsync } from 'rustlike-result';

import type { FetchFactoryOptions, FetchOptions, FetchResponse } from './types.js';

function isUnstringifiable(value: BodyInit | object | undefined): value is BodyInit | undefined {
    return (
        !value ||
        typeof value === 'string' ||
        value instanceof ArrayBuffer ||
        ArrayBuffer.isView(value) ||
        value instanceof Blob ||
        value instanceof FormData ||
        value instanceof ReadableStream ||
        value instanceof URLSearchParams
    );
}

export interface Fetcher {
    <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        options?: FetchOptions<Req>,
    ): ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    get: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    head: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    options: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    post: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    delete: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    put: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;

    patch: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>;
}

export function fetcherFactory(factoryOptions?: FetchFactoryOptions): Fetcher {
    function fetcher<Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        options?: FetchOptions<Req>,
    ): ResultAsync<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError> {
        const { baseURL } = factoryOptions ?? {};
        const { method, params, responseType = 'json', signal } = options ?? {};
        const headers = { ...options?.headers, ...factoryOptions?.headers };
        const payload = options?.data;
        const validateStatus = options?.validateStatus ?? factoryOptions?.validateStatus;

        const processUrl = () => {
            const formattedUrl = url.startsWith('/') ? url : `/${url}`;
            const mergedUrl = baseURL ? baseURL + formattedUrl : formattedUrl;
            return params ? buildQueryURL(mergedUrl, params) : mergedUrl;
        };

        const getExtraHeaders = () => {
            const extraHeaders: Record<string, string> = {};

            if (!isUnstringifiable(payload)) {
                extraHeaders['content-type'] = 'application/json; charset=utf-8';
            }

            return extraHeaders;
        };

        const processedUrl = processUrl();
        const extraHeaders = getExtraHeaders();

        const innerFetcher = async (): Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp> | TypeError>> => {
            const responseResult = await resultifyAsync<TypeError>()(fetch)(processedUrl, {
                method,
                body: isUnstringifiable(payload) ? payload : JSON.stringify(payload),
                headers: {
                    ...extraHeaders,
                    ...Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])),
                },
                // We need to manually set the default value to `same-origin`,
                // Because old browsers use `omit` as the default value
                // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#browser_compatibility
                credentials: options?.credentials ?? factoryOptions?.credentials ?? 'same-origin',
                signal,
            });
            if (responseResult.isErr()) {
                return responseResult;
            }

            const resp = responseResult.unwrap();
            const ok = validateStatus ? validateStatus(resp.status) : resp.ok;
            const respData = responseType === 'stream' ? (resp.body as Resp) : ((await resp[responseType]()) as Resp);
            const response: FetchResponse<Resp | ErrResp> = {
                data: respData,
                headers: resp.headers,
                redirected: resp.redirected,
                status: resp.status,
                statusText: resp.statusText,
                type: resp.type,
                url: resp.url,
            };

            return ok ? Ok(response as FetchResponse<Resp>) : Err(response as FetchResponse<ErrResp>);
        };

        return fromPromiseableResult(innerFetcher());
    }

    fetcher.get = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'GET' });

    fetcher.head = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'HEAD' });

    fetcher.options = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'OPTIONS' });

    fetcher.post = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'POST' });

    fetcher.delete = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'DELETE' });

    fetcher.put = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'PUT' });

    fetcher.patch = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'PATCH' });

    return fetcher;
}
