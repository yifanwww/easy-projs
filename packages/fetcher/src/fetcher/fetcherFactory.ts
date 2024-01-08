import type { FetchFactoryOptions, FetchOptions, FetchResponse } from './types.js';
import { buildURL } from './url.js';

function isPlainJsonObject(obj: unknown): boolean {
    return !!obj && typeof obj === 'object' && typeof (obj as { append?: unknown }).append !== 'function';
}

export interface Fetcher {
    <Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        options?: FetchOptions<Req>,
    ): Promise<FetchResponse<Resp>>;

    get: <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) => Promise<FetchResponse<Resp>>;

    head: <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) => Promise<FetchResponse<Resp>>;

    options: <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) => Promise<FetchResponse<Resp>>;

    post: <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => Promise<FetchResponse<Resp>>;

    delete: <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => Promise<FetchResponse<Resp>>;

    put: <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => Promise<FetchResponse<Resp>>;

    patch: <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => Promise<FetchResponse<Resp>>;
}

export function fetcherFactory(factoryOptions?: FetchFactoryOptions): Fetcher {
    async function fetcher<Resp, Req extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        options?: FetchOptions<Req>,
    ): Promise<FetchResponse<Resp>> {
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
        const response: FetchResponse<Resp> = {
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
            response.data = JSON.parse(respData as string) as Resp;
        } catch {
            // do nothing
        }
        return ok ? response : Promise.reject(response);
    }

    fetcher.get = <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp>(url, { ...options, method: 'get' });

    fetcher.head = <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp>(url, { ...options, method: 'head' });

    fetcher.options = <Resp>(url: string, options?: Omit<FetchOptions, 'data' | 'method'>) =>
        fetcher<Resp>(url, { ...options, method: 'options' });

    fetcher.post = <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => fetcher<Resp, Payload>(url, { ...config, data, method: 'post' });

    fetcher.delete = <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => fetcher<Resp, Payload>(url, { ...config, data, method: 'delete' });

    fetcher.put = <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => fetcher<Resp, Payload>(url, { ...config, data, method: 'put' });

    fetcher.patch = <Resp, Payload extends BodyInit | NonNullable<unknown> = NonNullable<unknown>>(
        url: string,
        data?: Payload,
        config?: Omit<FetchOptions<Payload>, 'data' | 'method'>,
    ) => fetcher<Resp, Payload>(url, { ...config, data, method: 'patch' });

    return fetcher;
}
