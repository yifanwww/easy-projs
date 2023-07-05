import type { StorageKey } from './types';

export function createStorageLoader(storage: Storage) {
    function loadStorageValue(key: StorageKey): string | null {
        const keys = key.fallbacks ? [key.main, ...key.fallbacks] : [key.main];

        for (const _key of keys) {
            const raw = storage.getItem(_key);
            if (raw !== null) {
                return raw;
            }
        }

        return null;
    }

    return loadStorageValue;
}

function removeStorageItems(storage: Storage, keys: string[]): void {
    for (const key of keys) {
        storage.removeItem(key);
    }
}

export function createStorageSaver(storage: Storage) {
    function saveStorageValue(key: StorageKey, value: string): void {
        if (key.fallbacks) {
            removeStorageItems(storage, key.fallbacks);
        }
        storage.setItem(key.main, value);
    }

    return saveStorageValue;
}

export function createStorageRemover(storage: Storage) {
    function removeStorageValue(key: StorageKey): void {
        removeStorageItems(storage, [key.main]);
        if (key.fallbacks) {
            removeStorageItems(storage, key.fallbacks);
        }
    }

    return removeStorageValue;
}
