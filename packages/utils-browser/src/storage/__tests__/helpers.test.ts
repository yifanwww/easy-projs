import { mockStorage } from '@easy-pkg/utils-test';

import { createStorageLoader, createStorageRemover, createStorageSaver } from '../helpers';
import type { StorageKey } from '../types';

mockStorage(window.localStorage);
mockStorage(window.sessionStorage);

describe(`Test fn ${createStorageLoader.name}`, () => {
    function testLoad1(storage: Storage) {
        const KEY = 'key';
        const VALUE = 'value';

        const loadValue = createStorageLoader(storage);
        expect(loadValue({ main: KEY })).toBeNull();

        storage.setItem(KEY, VALUE);
        expect(loadValue({ main: KEY })).toBe(VALUE);
    }

    function testLoad2(storage: Storage) {
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
        testLoad1(window.localStorage);
    });

    it('should load local storage values #2', () => {
        testLoad2(window.localStorage);
    });

    it('should load session storage values #1', () => {
        testLoad1(window.sessionStorage);
    });

    it('should load session storage values #2', () => {
        testLoad2(window.sessionStorage);
    });
});

describe(`Test fn ${createStorageRemover.name}`, () => {
    function testRemove(storage: Storage) {
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
        testRemove(window.localStorage);
    });

    it('should remove session storage values', () => {
        testRemove(window.sessionStorage);
    });
});

describe(`Test fn ${createStorageSaver.name}`, () => {
    function testSave(storage: Storage) {
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
        testSave(window.localStorage);
    });

    it('should save session storage values and remove fallback key values', () => {
        testSave(window.sessionStorage);
    });
});