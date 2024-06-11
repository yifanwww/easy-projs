import { describe, expect, it } from '@jest/globals';

import { URLSearchParamsUtil } from '../URLSearchParams.js';

describe(`Test static method \`${URLSearchParamsUtil.name}.${URLSearchParamsUtil['_appendMulti'].name}\``, () => {
    it('should be able to append multi values', () => {
        const usp = new URLSearchParams();
        URLSearchParamsUtil['_appendMulti'](usp, 'key', ['foo']);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil['_appendMulti'](usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil['_appendMulti'](usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar1', 'bar2']);
    });
});

describe(`Test static method \`${URLSearchParamsUtil.name}.${URLSearchParamsUtil['_set'].name}\``, () => {
    it('should be able to set multi values', () => {
        const usp = new URLSearchParams();
        URLSearchParamsUtil['_set'](usp, 'key', ['foo']);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil['_set'](usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil['_set'](usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
    });
});

describe(`Test static method \`${URLSearchParamsUtil.name}.${URLSearchParamsUtil.append.name}\``, () => {
    it('should be able to append multi values', () => {
        const usp = new URLSearchParams();
        URLSearchParamsUtil.append(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil.append(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        URLSearchParamsUtil.append(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        URLSearchParamsUtil.append(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        URLSearchParamsUtil.append(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar', 'bar1', 'bar2']);
    });
});

describe(`Test static method \`${URLSearchParamsUtil.name}.${URLSearchParamsUtil.set.name}\``, () => {
    it('should be able to set multi values', () => {
        const usp = new URLSearchParams();
        URLSearchParamsUtil.set(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil.set(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        URLSearchParamsUtil.set(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        URLSearchParamsUtil.set(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        URLSearchParamsUtil.set(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
    });
});

describe(`Test static method \`${URLSearchParamsUtil.name}.${URLSearchParamsUtil.setOrDelete.name}\``, () => {
    it('should be able to set multi values or delete it', () => {
        const usp = new URLSearchParams();
        URLSearchParamsUtil.setOrDelete(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        URLSearchParamsUtil.setOrDelete(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        URLSearchParamsUtil.setOrDelete(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual([]);
        URLSearchParamsUtil.setOrDelete(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
        URLSearchParamsUtil.setOrDelete(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual([]);
    });
});
