import { FetchOptions, FetchResponse, Method } from './types';
import { appendURL, buildURL } from './url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

function deepMerge(options?: AnyObject, overrides?: AnyObject, lowercase = false) {
    const out: AnyObject = {};

    for (const key in options) {
        const _key = lowercase ? key.toLowerCase() : key;
        out[_key] = options[key];
    }

    for (const key in overrides) {
        const _key = lowercase ? key.toLowerCase() : key;
        const existValue = out[_key];
        const value = overrides[key];
        out[_key] =
            typeof existValue === 'object' && existValue !== null && typeof value === 'object' && value !== null
                ? deepMerge(existValue, value, _key === 'headers')
                : value;
    }

    return out;
}

export interface Fetcher {
    <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        config?: FetchOptions<Payload> | undefined,
        _method?: Method | undefined,
        _data?: Payload | undefined,
    ): Promise<FetchResponse<Data>>;

    get: <Data = unknown>(url: string, config?: FetchOptions<BodyInit> | undefined) => Promise<FetchResponse<Data>>;
    head: <Data = unknown>(url: string, config?: FetchOptions<BodyInit> | undefined) => Promise<FetchResponse<Data>>;
    options: <Data = unknown>(url: string, config?: FetchOptions<BodyInit> | undefined) => Promise<FetchResponse<Data>>;

    post: <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    delete: <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    put: <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    patch: <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
}

export function createFetcher(defaults?: FetchOptions<BodyInit>): Fetcher {
    function fetcher<Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        config?: FetchOptions<Payload>,
        _method?: Method,
        _data?: Payload,
    ): Promise<FetchResponse<Data>> {
        const options = deepMerge(defaults, config) as FetchOptions<Payload>;
        const {
            auth,
            baseURL,
            data,
            headers,
            method,
            params,
            paramsSerializer,
            payload,
            responseType,
            signal,
            validateStatus,
            withCredentials,
        } = options;

        const getRealURL = () => {
            const _url = baseURL ? appendURL(baseURL, url) : url;
            return params ? buildURL(_url, params, paramsSerializer) : _url;
        };

        const _url = getRealURL();

        const customHeaders: Record<string, string> = {
            'content-type': 'application/json; charset=utf-8',
        };
        if (auth) {
            customHeaders.authorization = auth;
        }

        return fetch(_url, {
            method: _method ?? method,
            body: _data ?? data ?? payload,
            headers: deepMerge(headers, customHeaders, true),
            credentials: withCredentials ? 'include' : 'same-origin',
            signal,
        }).then((resp) => {
            const ok = validateStatus ? validateStatus(resp.status) : resp.ok;

            return resp[responseType ?? 'json']()
                .then((respData) => {
                    const response: FetchResponse<Data> = {
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
                        response.data = JSON.parse(respData);
                    } catch {
                        // do nothing
                    }

                    return response;
                })
                .then((response) => (ok ? response : Promise.reject(response)));
        });
    }

    fetcher.get = <Data = unknown>(url: string, config?: FetchOptions) => fetcher<Data>(url, config, 'get');
    fetcher.head = <Data = unknown>(url: string, config?: FetchOptions) => fetcher<Data>(url, config, 'head');
    fetcher.options = <Data = unknown>(url: string, config?: FetchOptions) => fetcher<Data>(url, config, 'options');

    fetcher.post = <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, config, 'post', data);

    fetcher.delete = <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, config, 'delete', data);

    fetcher.put = <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, config, 'put', data);

    fetcher.patch = <Data = unknown, Payload extends BodyInit = BodyInit>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, config, 'patch', data);

    return fetcher;
}

export const fetcher = createFetcher();
