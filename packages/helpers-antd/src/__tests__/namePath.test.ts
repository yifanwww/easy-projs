import { describe, expect, it } from '@jest/globals';

import { NamePathHelper } from '../namePath';

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper['_toArray'].name}\``, () => {
    it('should convert a non-array name path to a array name path', () => {
        expect(NamePathHelper['_toArray'](1)).toStrictEqual([1]);
        expect(NamePathHelper['_toArray']('value')).toStrictEqual(['value']);
        expect(NamePathHelper['_toArray']([])).toStrictEqual([]);
        expect(NamePathHelper['_toArray'](['value', 'value'])).toStrictEqual(['value', 'value']);
    });
});

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper.equal.name}\``, () => {
    it('should check if two name paths equal', () => {
        expect(NamePathHelper.equal('value', 'value')).toBe(true);
        expect(NamePathHelper.equal([], [])).toBe(true);
        expect(NamePathHelper.equal(['value', 'value'], ['value', 'value'])).toBe(true);

        expect(NamePathHelper.equal('value1', 'value2')).toBe(false);
        expect(NamePathHelper.equal([], 'value')).toBe(false);
        expect(NamePathHelper.equal('value', [])).toBe(false);
        expect(NamePathHelper.equal(['value1'], ['value2'])).toBe(false);
    });
});

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper.indexOf.name}\``, () => {
    it('should return the index of the search element', () => {
        expect(NamePathHelper.indexOf(['value'], 'value')).toBe(0);
        expect(NamePathHelper.indexOf(['value1', 'value2', 'value3'], 'value3')).toBe(2);
        expect(NamePathHelper.indexOf([['value1'], 'value2', ['value3']], ['value3'])).toBe(2);
        expect(NamePathHelper.indexOf(['value1', ['value2', 'value3']], ['value2', 'value3'])).toBe(1);
    });

    it('should return -1 if cannot find the search element', () => {
        expect(NamePathHelper.indexOf(undefined, 'value')).toBe(-1);
        expect(NamePathHelper.indexOf(null, 'value')).toBe(-1);
        expect(NamePathHelper.indexOf([], 'value')).toBe(-1);
        expect(NamePathHelper.indexOf(['value1', 'value2'], 'value3')).toBe(-1);
        expect(NamePathHelper.indexOf([['value1'], 'value2', ['value3']], 'value3')).toBe(-1);
        expect(NamePathHelper.indexOf(['value1', ['value2', 'value3']], ['value1', 'value3'])).toBe(-1);
    });
});

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper.includes.name}\``, () => {
    it('should return if the name path contains the search element', () => {
        expect(NamePathHelper.includes(['value'], 'value')).toBe(true);
        expect(NamePathHelper.includes(['value1', 'value2', 'value3'], 'value3')).toBe(true);
        expect(NamePathHelper.includes([['value1'], 'value2', ['value3']], ['value3'])).toBe(true);
        expect(NamePathHelper.includes(['value1', ['value2', 'value3']], ['value2', 'value3'])).toBe(true);

        expect(NamePathHelper.includes(undefined, 'value')).toBe(false);
        expect(NamePathHelper.includes(null, 'value')).toBe(false);
        expect(NamePathHelper.includes([], 'value')).toBe(false);
        expect(NamePathHelper.includes(['value1', 'value2'], 'value3')).toBe(false);
        expect(NamePathHelper.includes([['value1'], 'value2', ['value3']], 'value3')).toBe(false);
        expect(NamePathHelper.includes(['value1', ['value2', 'value3']], ['value1', 'value3'])).toBe(false);
    });
});

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper.merge.name}\``, () => {
    it('should merge two name paths', () => {
        expect(NamePathHelper.merge('value')).toBe('value');
        expect(NamePathHelper.merge(['value'])).toStrictEqual(['value']);

        expect(NamePathHelper.merge('value1', 'value2')).toStrictEqual(['value2', 'value1']);
        expect(NamePathHelper.merge(['value1'], ['value2'])).toStrictEqual(['value2', 'value1']);
        expect(NamePathHelper.merge([], 'value')).toStrictEqual(['value']);
        expect(NamePathHelper.merge([], ['value'])).toStrictEqual(['value']);
    });
});

describe(`Test static method \`${NamePathHelper.name}.${NamePathHelper.startsWith.name}\``, () => {
    it('should check if the name path starts with a certain subsequence', () => {
        expect(NamePathHelper.startsWith('value', 'value')).toBe(true);
        expect(NamePathHelper.startsWith('value', 'value1')).toBe(false);
        expect(NamePathHelper.startsWith(['value'], 'value')).toBe(true);
        expect(NamePathHelper.startsWith(['value'], 'value1')).toBe(false);
        expect(NamePathHelper.startsWith(['value'], ['value'])).toBe(true);
        expect(NamePathHelper.startsWith(['value'], ['value1'])).toBe(false);
        expect(NamePathHelper.startsWith(['value', 'foo'], ['value'])).toBe(true);
        expect(NamePathHelper.startsWith(['value', 'foo', 'bar'], ['value'])).toBe(true);
        expect(NamePathHelper.startsWith([], 'value')).toBe(false);
        expect(NamePathHelper.startsWith([], ['value'])).toBe(false);
    });
});
