import type { Result } from 'rustlike-result';
import { Err, Ok } from 'rustlike-result';

import type { FetchFactoryOptions, FetchOptions, FetchResponse } from './types.js';
import { buildURL } from './url.js';

function isPlainJsonObject(obj: unknown): boolean {
    return !!obj && typeof obj === 'object' && typeof (obj as { append?: unknown }).append !== 'function';
}

export interface Fetcher {
    <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
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

    post: <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    delete: <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    put: <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;

    patch: <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>>;
}

export function fetcherFactory(factoryOptions?: FetchFactoryOptions): Fetcher {
    async function fetcher<Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        options?: FetchOptions<Req>,
    ): Promise<Result<FetchResponse<Resp>, FetchResponse<ErrResp>>> {
        const { baseURL } = factoryOptions ?? {};
        const { method, params, responseType, signal } = options ?? {};
        const auth = options?.auth ?? factoryOptions?.auth;
        const headers = { ...options?.headers, ...factoryOptions?.headers };
        const paramsSerializer = options?.paramsSerializer ?? factoryOptions?.paramsSerializer;
        const payload = options?.data;
        const validateStatus = options?.validateStatus ?? factoryOptions?.validateStatus;
        const withCredentials = options?.withCredentials ?? factoryOptions?.withCredentials;

        const getRealURL = () => {
            const formattedURL = url.startsWith('/') ? url : `/${url}`;
            const finalURL = baseURL ? baseURL + formattedURL : formattedURL;
            return params ? buildURL(finalURL, params, paramsSerializer) : finalURL;
        };

        const getExtraHeaders = () => {
            const extraHeaders: Record<string, string> = {};

            if (isPlainJsonObject(payload)) {
                extraHeaders['content-type'] = 'application/json; charset=utf-8';
            }
            if (auth) {
                extraHeaders.authorization = auth;
            }

            return extraHeaders;
        };

        const realURL = getRealURL();
        const extraHeaders = getExtraHeaders();

        const resp = await fetch(realURL, {
            method,
            body: isPlainJsonObject(payload) ? JSON.stringify(payload) : (payload as unknown as string),
            headers: {
                ...extraHeaders,
                ...Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])),
            },
            credentials: withCredentials ? 'include' : 'same-origin',
            signal,
        });

        const ok = validateStatus ? validateStatus(resp.status) : resp.ok;

        const respData = (await resp[responseType ?? 'json']()) as Resp;
        const response: FetchResponse<Resp | ErrResp> = {
            data: respData,
            headers: resp.headers,
            redirected: resp.redirected,
            status: resp.status,
            statusText: resp.statusText,
            type: resp.type,
            url: resp.url,
        };

        try {
            // response.data will be the unparsed value if it fails
            response.data = JSON.parse(respData as string) as Resp | ErrResp;
        } catch {
            // do nothing
        }
        return ok ? Ok(response as FetchResponse<Resp>) : Err(response as FetchResponse<ErrResp>);
    }

    fetcher.get = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'get' });

    fetcher.head = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'head' });

    fetcher.options = <Resp, ErrResp = Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp, ErrResp>(url, { ...options, method: 'options' });

    fetcher.post = <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'post' });

    fetcher.delete = <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'delete' });

    fetcher.put = <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'put' });

    fetcher.patch = <Resp, ErrResp = Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Req,
        config?: Omit<FetchOptions<Req>, 'data' | 'method'>,
    ) => fetcher<Resp, ErrResp, Req>(url, { ...config, data, method: 'patch' });

    return fetcher;
}
