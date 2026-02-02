import type { StorageKey } from '@easy-lib/utils-browser';
import { createStorageLoader, createStorageRemover, createStorageSaver } from '@easy-lib/utils-browser';

export const loadLocalStorageValue = createStorageLoader(window.localStorage);
export const saveLocalStorageValue = createStorageSaver(window.localStorage);
export const removeLocalStorageValue = createStorageRemover(window.localStorage);

export function tryParseLocalStorageJsonValue<T>(value: string, key: string | StorageKey): T | null {
    try {
        return JSON.parse(value) as T;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Error occurs when parsing local storage item ${typeof key === 'string' ? key : key.main}`, err);
        return null;
    }
}
