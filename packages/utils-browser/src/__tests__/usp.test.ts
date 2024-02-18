import { describe, expect, it } from '@jest/globals';

import { UspUtil } from '../usp.js';

describe(`Test static method \`${UspUtil.name}.${UspUtil['_appendMulti'].name}\``, () => {
    it('should be able to append multi values', () => {
        const usp = new URLSearchParams();
        UspUtil['_appendMulti'](usp, 'key', ['foo']);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil['_appendMulti'](usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil['_appendMulti'](usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar1', 'bar2']);
    });
});

describe(`Test static method \`${UspUtil.name}.${UspUtil['_set'].name}\``, () => {
    it('should be able to set multi values', () => {
        const usp = new URLSearchParams();
        UspUtil['_set'](usp, 'key', ['foo']);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil['_set'](usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil['_set'](usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
    });
});

describe(`Test static method \`${UspUtil.name}.${UspUtil.append.name}\``, () => {
    it('should be able to append multi values', () => {
        const usp = new URLSearchParams();
        UspUtil.append(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil.append(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        UspUtil.append(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        UspUtil.append(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar']);
        UspUtil.append(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['foo', 'bar', 'bar1', 'bar2']);
    });
});

describe(`Test static method \`${UspUtil.name}.${UspUtil.set.name}\``, () => {
    it('should be able to set multi values', () => {
        const usp = new URLSearchParams();
        UspUtil.set(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil.set(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        UspUtil.set(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        UspUtil.set(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        UspUtil.set(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
    });
});

describe(`Test static method \`${UspUtil.name}.${UspUtil.setOrDelete.name}\``, () => {
    it('should be able to set multi values or delete it', () => {
        const usp = new URLSearchParams();
        UspUtil.setOrDelete(usp, 'key', 'foo');
        expect(usp.getAll('key')).toStrictEqual(['foo']);
        UspUtil.setOrDelete(usp, 'key', ['bar']);
        expect(usp.getAll('key')).toStrictEqual(['bar']);
        UspUtil.setOrDelete(usp, 'key');
        expect(usp.getAll('key')).toStrictEqual([]);
        UspUtil.setOrDelete(usp, 'key', ['bar1', 'bar2']);
        expect(usp.getAll('key')).toStrictEqual(['bar1', 'bar2']);
        UspUtil.setOrDelete(usp, 'key', []);
        expect(usp.getAll('key')).toStrictEqual([]);
    });
});
