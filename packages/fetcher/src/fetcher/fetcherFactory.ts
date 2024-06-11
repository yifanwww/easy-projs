import type { Result } from 'rustlike-result';
import { Err, Ok } from 'rustlike-result';

import type { FetchFactoryOptions, FetchOptions, FetchResponse } from './types.js';
import { buildQueryURL } from './url.js';

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
    ): Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    get: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    head: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    options: <Resp, ErrResp = Resp>(
        url: string,
        options?: Omit<FetchOptions, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    post: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    delete: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    put: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    patch: <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;
}

export function fetcherFactory(factoryOptions?: FetchFactoryOptions): Fetcher {
    async function fetcher<Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        options?: FetchOptions<Req>,
    ): Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>> {
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

        const resp = await fetch(processedUrl, {
            method,
            body: isUnstringifiable(payload) ? payload : JSON.stringify(payload),
            headers: {
                ...extraHeaders,
                ...Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])),
            },
            // Old browsers use `omit` as the default value, we need to manually set the default value to `same-origin`
            // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials#browser_compatibility
            credentials: options?.credentials ?? factoryOptions?.credentials ?? 'same-origin',
            signal,
        });

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
    }

    fetcher.get = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'get' });

    fetcher.head = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'head' });

    fetcher.options = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'options' });

    fetcher.post = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'post' });

    fetcher.delete = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'delete' });

    fetcher.put = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'put' });

    fetcher.patch = <Resp, ErrResp = Resp, Req extends BodyInit | object = object>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'patch' });

    return fetcher;
}
