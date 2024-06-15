type QueryParamValue = string | number | boolean;

function convertQueryParamValue(pair: [string, QueryParamValue]): [string, string] {
    return [pair[0], pair[1].toString()];
}

export type QueryURLParamsInit =
    | [string, QueryParamValue | undefined][]
    | Record<string, QueryParamValue | undefined>
    | string
    | URLSearchParams;

export function buildQueryURL<Params extends QueryURLParamsInit>(url: string, params?: Params) {
    if (!params) return url;

    const divider = ~url.indexOf('?') ? '&' : '?';

    const normalizeParams = (): [string, string][] | string | URLSearchParams => {
        if (Array.isArray(params)) {
            return params
                .filter((pair): pair is [string, QueryParamValue] => pair[1] !== undefined)
                .map(convertQueryParamValue);
        }

        if (typeof params !== 'string' && !(params instanceof URLSearchParams)) {
            return Object.entries(params)
                .filter((pair): pair is [string, QueryParamValue] => pair[1] !== undefined)
                .map(convertQueryParamValue);
        }

        return params;
    };

    const query = new URLSearchParams(normalizeParams()).toString();
    return query ? url + divider + query : url;
}
