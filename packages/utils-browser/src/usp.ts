export class UspUtil {
    private static _appendMulti(usp: URLSearchParams, name: string, values: string[]) {
        for (const item of values) {
            usp.append(name, item);
        }
    }

    private static _set(usp: URLSearchParams, name: string, values: string[]) {
        if (values.length === 1) {
            usp.set(name, values[0]);
        } else if (values.length > 1) {
            usp.delete(name);
            UspUtil._appendMulti(usp, name, values);
        }
    }

    static append(usp: URLSearchParams, name: string, value?: string | string[]) {
        if (value === undefined) return;
        UspUtil._appendMulti(usp, name, typeof value === 'string' ? [value] : value);
    }

    static set(usp: URLSearchParams, name: string, value?: string | string[]) {
        if (value === undefined) return;
        UspUtil._set(usp, name, typeof value === 'string' ? [value] : value);
    }

    static setOrDelete(usp: URLSearchParams, name: string, value?: string | string[]) {
        const values = typeof value === 'string' ? [value] : value;
        if (values === undefined || values.length === 0) {
            usp.delete(name);
        } else {
            UspUtil._set(usp, name, values);
        }
    }
}
