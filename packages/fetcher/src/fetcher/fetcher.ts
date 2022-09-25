import { FetchOptions, FetchResponse, Method } from './types';
import { appendURL, buildURL } from './url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPlainJsonObject(obj: any): boolean {
    return !!obj && typeof obj === 'object' && typeof obj.append !== 'function';
}

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
    <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        method?: Method | undefined,
        config?: FetchOptions<Payload> | undefined,
        _data?: Payload | undefined,
    ): Promise<FetchResponse<Data>>;

    get: <Data>(url: string, config?: FetchOptions | undefined) => Promise<FetchResponse<Data>>;
    head: <Data>(url: string, config?: FetchOptions | undefined) => Promise<FetchResponse<Data>>;
    options: <Data>(url: string, config?: FetchOptions | undefined) => Promise<FetchResponse<Data>>;

    post: <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    delete: <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    put: <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
    patch: <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload | undefined,
        config?: FetchOptions<Payload> | undefined,
    ) => Promise<FetchResponse<Data>>;
}

export function createFetcher(defaults?: FetchOptions): Fetcher {
    function fetcher<Data, Payload extends BodyInit | {} = {}>(
        url: string,
        method?: Method,
        config?: FetchOptions<Payload>,
        _data?: Payload,
    ): Promise<FetchResponse<Data>> {
        const options = deepMerge(defaults, config) as FetchOptions<Payload>;
        const {
            auth,
            baseURL,
            headers,
            params,
            paramsSerializer,
            responseType,
            signal,
            validateStatus,
            withCredentials,
        } = options;

        const data = _data ?? options.data ?? options.payload;

        const getRealURL = () => {
            const _url = baseURL ? appendURL(baseURL, url) : url;
            return params ? buildURL(_url, params, paramsSerializer) : _url;
        };

        const getCustomHeaders = () => {
            const customHeaders: Record<string, string> = {};

            if (isPlainJsonObject(data)) {
                customHeaders['content-type'] = 'application/json; charset=utf-8';
            }
            if (auth) {
                customHeaders.authorization = auth;
            }

            return customHeaders;
        };

        const _url = getRealURL();
        const customHeaders = getCustomHeaders();

        return fetch(_url, {
            method,
            body: isPlainJsonObject(data) ? JSON.stringify(data) : (data as unknown as string),
            headers: deepMerge(customHeaders, headers, true),
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

    fetcher.get = <Data>(url: string, config?: FetchOptions) => fetcher<Data>(url, 'get', config);
    fetcher.head = <Data>(url: string, config?: FetchOptions) => fetcher<Data>(url, 'head', config);
    fetcher.options = <Data>(url: string, config?: FetchOptions) => fetcher<Data>(url, 'options', config);

    fetcher.post = <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, 'post', config, data);

    fetcher.delete = <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, 'delete', config, data);

    fetcher.put = <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, 'put', config, data);

    fetcher.patch = <Data, Payload extends BodyInit | {} = {}>(
        url: string,
        data?: Payload,
        config?: FetchOptions<Payload>,
    ) => fetcher<Data, Payload>(url, 'patch', config, data);

    return fetcher;
}

export const fetcher = createFetcher();
