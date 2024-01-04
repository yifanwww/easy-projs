import { describe, expect, it } from '@jest/globals';

import { NamePathUtil } from '../namePath';

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil['_toArray'].name}\``, () => {
    it('should convert a non-array name path to a array name path', () => {
        expect(NamePathUtil['_toArray'](1)).toStrictEqual([1]);
        expect(NamePathUtil['_toArray']('value')).toStrictEqual(['value']);
        expect(NamePathUtil['_toArray']([])).toStrictEqual([]);
        expect(NamePathUtil['_toArray'](['value', 'value'])).toStrictEqual(['value', 'value']);
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.equal.name}\``, () => {
    it('should check if two name paths equal', () => {
        expect(NamePathUtil.equal('value', 'value')).toBe(true);
        expect(NamePathUtil.equal([], [])).toBe(true);
        expect(NamePathUtil.equal(['value', 'value'], ['value', 'value'])).toBe(true);

        expect(NamePathUtil.equal('value1', 'value2')).toBe(false);
        expect(NamePathUtil.equal([], 'value')).toBe(false);
        expect(NamePathUtil.equal('value', [])).toBe(false);
        expect(NamePathUtil.equal(['value1'], ['value2'])).toBe(false);
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.indexOf.name}\``, () => {
    it('should return the index of the search element', () => {
        expect(NamePathUtil.indexOf(['value'], 'value')).toBe(0);
        expect(NamePathUtil.indexOf(['value1', 'value2', 'value3'], 'value3')).toBe(2);
        expect(NamePathUtil.indexOf([['value1'], 'value2', ['value3']], ['value3'])).toBe(2);
        expect(NamePathUtil.indexOf(['value1', ['value2', 'value3']], ['value2', 'value3'])).toBe(1);
    });

    it('should return -1 if cannot find the search element', () => {
        expect(NamePathUtil.indexOf(undefined, 'value')).toBe(-1);
        expect(NamePathUtil.indexOf(null, 'value')).toBe(-1);
        expect(NamePathUtil.indexOf([], 'value')).toBe(-1);
        expect(NamePathUtil.indexOf(['value1', 'value2'], 'value3')).toBe(-1);
        expect(NamePathUtil.indexOf([['value1'], 'value2', ['value3']], 'value3')).toBe(-1);
        expect(NamePathUtil.indexOf(['value1', ['value2', 'value3']], ['value1', 'value3'])).toBe(-1);
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.includes.name}\``, () => {
    it('should return if the name path contains the search element', () => {
        expect(NamePathUtil.includes(['value'], 'value')).toBe(true);
        expect(NamePathUtil.includes(['value1', 'value2', 'value3'], 'value3')).toBe(true);
        expect(NamePathUtil.includes([['value1'], 'value2', ['value3']], ['value3'])).toBe(true);
        expect(NamePathUtil.includes(['value1', ['value2', 'value3']], ['value2', 'value3'])).toBe(true);

        expect(NamePathUtil.includes(undefined, 'value')).toBe(false);
        expect(NamePathUtil.includes(null, 'value')).toBe(false);
        expect(NamePathUtil.includes([], 'value')).toBe(false);
        expect(NamePathUtil.includes(['value1', 'value2'], 'value3')).toBe(false);
        expect(NamePathUtil.includes([['value1'], 'value2', ['value3']], 'value3')).toBe(false);
        expect(NamePathUtil.includes(['value1', ['value2', 'value3']], ['value1', 'value3'])).toBe(false);
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.merge.name}\``, () => {
    it('should merge two name paths', () => {
        expect(NamePathUtil.merge('value')).toBe('value');
        expect(NamePathUtil.merge(['value'])).toStrictEqual(['value']);

        expect(NamePathUtil.merge('value1', 'value2')).toStrictEqual(['value2', 'value1']);
        expect(NamePathUtil.merge(['value1'], ['value2'])).toStrictEqual(['value2', 'value1']);
        expect(NamePathUtil.merge([], 'value')).toStrictEqual(['value']);
        expect(NamePathUtil.merge([], ['value'])).toStrictEqual(['value']);
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.startsWith.name}\``, () => {
    it('should check if the name path starts with a certain subsequence', () => {
        expect(NamePathUtil.startsWith('value', 'value')).toBe(true);
        expect(NamePathUtil.startsWith('value', 'value1')).toBe(false);
        expect(NamePathUtil.startsWith(['value'], 'value')).toBe(true);
        expect(NamePathUtil.startsWith(['value'], 'value1')).toBe(false);
        expect(NamePathUtil.startsWith(['value'], ['value'])).toBe(true);
        expect(NamePathUtil.startsWith(['value'], ['value1'])).toBe(false);
        expect(NamePathUtil.startsWith(['value', 'foo'], ['value'])).toBe(true);
        expect(NamePathUtil.startsWith(['value', 'foo', 'bar'], ['value'])).toBe(true);
        expect(NamePathUtil.startsWith([], 'value')).toBe(false);
        expect(NamePathUtil.startsWith([], ['value'])).toBe(false);
    });
});
