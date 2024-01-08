export function appendURL(baseURL: string, url: string) {
    const _url = url.startsWith('/') ? url : `/${url}`;
    return baseURL + _url;
}

type URLParams = [string, string | undefined][] | Record<string, string | undefined> | string | URLSearchParams;

export function buildURL<Params extends URLParams>(
    url: string,
    params?: Params,
    paramsSerializer?: (params: Params) => string,
) {
    if (!params) return url;

    const divider = ~url.indexOf('?') ? '&' : '?';

    const normalizeParams = (): [string, string][] | string | URLSearchParams => {
        if (Array.isArray(params)) {
            return params.filter((pair): pair is [string, string] => pair[1] !== undefined);
        }

        if (typeof params !== 'string' && !(params instanceof URLSearchParams)) {
            return Object.entries(params).filter((pair): pair is [string, string] => pair[1] !== undefined);
        }

        return params;
    };

    const query = paramsSerializer ? paramsSerializer(params) : new URLSearchParams(normalizeParams()).toString();
    return url + divider + query;
}
