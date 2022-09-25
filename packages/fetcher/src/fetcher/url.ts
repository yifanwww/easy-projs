export function appendURL(baseURL: string, url: string) {
    const _url = url.startsWith('/') ? url : `/${url}`;
    return baseURL + _url;
}

export function buildURL(
    url: string,
    params: Record<string, string> | URLSearchParams,
    paramsSerializer?: (params: Record<string, string> | URLSearchParams) => string,
) {
    const divider = ~url.indexOf('?') ? '&' : '?';
    const query = paramsSerializer ? paramsSerializer(params) : new URLSearchParams(params);
    return url + divider + query;
}
