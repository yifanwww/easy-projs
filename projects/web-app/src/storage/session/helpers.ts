import type { StorageKey } from '@easy-pkg/utils-browser';
import { createStorageLoader, createStorageRemover, createStorageSaver } from '@easy-pkg/utils-browser';

export const loadSessionStorageValue = createStorageLoader(window.sessionStorage);
export const saveSessionStorageValue = createStorageSaver(window.sessionStorage);
export const removeSessionStorageValue = createStorageRemover(window.sessionStorage);

export function tryParseSessionStorageJsonValue<T>(value: string, key: string | StorageKey): T | null {
    try {
        return JSON.parse(value) as T;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Error occurs when parsing session storage item ${typeof key === 'string' ? key : key.main}`, err);
        return null;
    }
}
