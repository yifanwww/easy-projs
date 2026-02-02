import { mockStorage } from '@easy-pkg/utils-test';
import { describe, expect, it } from '@jest/globals';
import { createStorageLoader, createStorageRemover, createStorageSaver } from '../helpers.js';
import type { StorageKey } from '../types.js';

mockStorage(window.localStorage);
mockStorage(window.sessionStorage);

describe(`Test fn \`${createStorageLoader.name}\``, () => {
    function expectLoad1(storage: Storage) {
        const KEY = 'key';
        const VALUE = 'value';

        const loadValue = createStorageLoader(storage);
        expect(loadValue({ main: KEY })).toBeNull();

        storage.setItem(KEY, VALUE);
        expect(loadValue({ main: KEY })).toBe(VALUE);
    }

    function expectLoad2(storage: Storage) {
        const KEY = {
            main: 'key',
            fallbacks: ['fallback1', 'fallback2'],
        } satisfies StorageKey;
        const VALUE = 'value';

        const loadValue = createStorageLoader(storage);
        expect(loadValue(KEY)).toBeNull();

        storage.setItem(KEY.fallbacks[1], VALUE);
        expect(loadValue(KEY)).toBe(VALUE);
    }

    it('should load local storage values #1', () => {
        expectLoad1(window.localStorage);
    });

    it('should load local storage values #2', () => {
        expectLoad2(window.localStorage);
    });

    it('should load session storage values #1', () => {
        expectLoad1(window.sessionStorage);
    });

    it('should load session storage values #2', () => {
        expectLoad2(window.sessionStorage);
    });
});

describe(`Test fn \`${createStorageRemover.name}\``, () => {
    function expectRemove(storage: Storage) {
        const KEY = {
            main: 'key',
            fallbacks: ['fallback1', 'fallback2'],
        } satisfies StorageKey;
        const VALUE = 'value';

        storage.setItem(KEY.main, VALUE);
        for (const key of KEY.fallbacks) {
            storage.setItem(key, VALUE);
        }

        expect(storage.getItem(KEY.main)).toBe(VALUE);
        expect(storage.getItem(KEY.fallbacks[0])).toBe(VALUE);
        expect(storage.getItem(KEY.fallbacks[1])).toBe(VALUE);

        const removeValue = createStorageRemover(storage);
        removeValue(KEY);

        expect(storage.getItem(KEY.main)).toBeNull();
        expect(storage.getItem(KEY.fallbacks[0])).toBeNull();
        expect(storage.getItem(KEY.fallbacks[1])).toBeNull();
    }

    it('should remove local storage values', () => {
        expectRemove(window.localStorage);
    });

    it('should remove session storage values', () => {
        expectRemove(window.sessionStorage);
    });
});

describe(`Test fn ${createStorageSaver.name}`, () => {
    function expectSave(storage: Storage) {
        const KEY = {
            main: 'key',
            fallbacks: ['fallback1', 'fallback2'],
        } satisfies StorageKey;
        const VALUE = 'value';

        for (const key of KEY.fallbacks) {
            storage.setItem(key, VALUE);
        }

        expect(storage.getItem(KEY.main)).toBeNull();
        expect(storage.getItem(KEY.fallbacks[0])).toBe(VALUE);
        expect(storage.getItem(KEY.fallbacks[1])).toBe(VALUE);

        const saveValue = createStorageSaver(storage);
        saveValue(KEY, VALUE);

        expect(storage.getItem(KEY.main)).toBe(VALUE);
        expect(storage.getItem(KEY.fallbacks[0])).toBeNull();
        expect(storage.getItem(KEY.fallbacks[1])).toBeNull();
    }

    it('should save local storage values and remove fallback key values', () => {
        expectSave(window.localStorage);
    });

    it('should save session storage values and remove fallback key values', () => {
        expectSave(window.sessionStorage);
    });
});
