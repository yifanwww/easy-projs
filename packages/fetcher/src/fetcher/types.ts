import type { QueryURLParamsInit } from './url.js';

type Method =
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'options'
    | 'delete'
    | 'head'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'OPTIONS'
    | 'DELETE'
    | 'HEAD';

type FetchResponseType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'stream' | 'text';

export interface FetchFactoryOptions {
    /**
     * Authorization header value to send with the request.
     */
    auth?: string;
    /**
     * A base URL from which to resolve all URLs.
     */
    baseURL?: string;
    /**
     * Request headers.
     */
    headers?: Record<string, string>;
    /**
     * Customized function to stringify querystring parameters.
     */
    paramsSerializer?: (params: QueryURLParamsInit) => string;
    /**
     * Customized function to handle status code. By default 200-399 is success.
     */
    validateStatus?: (status: number) => boolean;
    /**
     * Send the request with credentials like cookies.
     */
    withCredentials?: boolean;
}

export interface FetchOptions<T extends BodyInit | object = object> {
    /**
     * Authorization header value to send with the request.
     */
    auth?: string;
    /**
     * Request headers.
     */
    headers?: Record<string, string>;
    data?: T;
    method?: Method;
    /**
     * querystring parameters.
     */
    params?: QueryURLParamsInit;
    /**
     * An encoding to use for the response. Default is `json`.
     */
    responseType?: FetchResponseType;
    /**
     * Customized function to stringify querystring parameters.
     */
    paramsSerializer?: (params: QueryURLParamsInit) => string;
    /**
     * Abort signal.
     */
    signal?: AbortSignal;
    /**
     * Customized function to handle status code. By default 200-399 is success.
     */
    validateStatus?: (status: number) => boolean;
    /**
     * Send the request with credentials like cookies.
     */
    withCredentials?: boolean;
}

export interface FetchResponse<Data = unknown> {
    data: Data;
    headers: Headers;
    redirected: boolean;
    status: number;
    statusText: string;
    type: ResponseType;
    url: string;
}
