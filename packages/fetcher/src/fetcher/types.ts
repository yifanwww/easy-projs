export type Method =
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

export type FetchBody = FormData | string | Record<string, unknown>;

export type FetchResponseType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

export interface FetchOptions<Payload extends BodyInit = BodyInit> {
    /** Request headers. */
    headers?: Record<string, string>;
    data?: Payload;
    /** A alias of `data`. */
    payload?: Payload;
    /** An encoding to use for the response. Default is `json`. */
    responseType?: FetchResponseType;
    /** wuerystring parameters. */
    params?: Record<string, string | undefined> | URLSearchParams;
    /** Customized function to stringify querystring parameters. */
    paramsSerializer?: (params: Record<string, string | undefined> | URLSearchParams) => string;
    /** Send the request with credentials like cookies. */
    withCredentials?: boolean;
    /** Authorization header value to send with the request. */
    auth?: string;
    /** Customized function to handle status code. By default 200-399 is success. */
    validateStatus?: (status: number) => boolean;
    /** A base URL from which to resolve all URLs. */
    baseURL?: string;
    /** Abort signal. */
    signal?: AbortSignal;
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
