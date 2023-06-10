import { NamePathUtil } from '../namePath';

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.equal.name}\``, () => {
    it('should check if two name paths equal', () => {
        expect(NamePathUtil.equal('value', 'value')).toBeTruthy();
        expect(NamePathUtil.equal([], [])).toBeTruthy();
        expect(NamePathUtil.equal(['value', 'value'], ['value', 'value'])).toBeTruthy();

        expect(NamePathUtil.equal('value1', 'value2')).toBeFalsy();
        expect(NamePathUtil.equal([], 'value')).toBeFalsy();
        expect(NamePathUtil.equal('value', [])).toBeFalsy();
        expect(NamePathUtil.equal(['value1'], ['value2'])).toBeFalsy();
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
        expect(NamePathUtil.includes(['value'], 'value')).toBeTruthy();
        expect(NamePathUtil.includes(['value1', 'value2', 'value3'], 'value3')).toBeTruthy();
        expect(NamePathUtil.includes([['value1'], 'value2', ['value3']], ['value3'])).toBeTruthy();
        expect(NamePathUtil.includes(['value1', ['value2', 'value3']], ['value2', 'value3'])).toBeTruthy();

        expect(NamePathUtil.includes(undefined, 'value')).toBeFalsy();
        expect(NamePathUtil.includes(null, 'value')).toBeFalsy();
        expect(NamePathUtil.includes([], 'value')).toBeFalsy();
        expect(NamePathUtil.includes(['value1', 'value2'], 'value3')).toBeFalsy();
        expect(NamePathUtil.includes([['value1'], 'value2', ['value3']], 'value3')).toBeFalsy();
        expect(NamePathUtil.includes(['value1', ['value2', 'value3']], ['value1', 'value3'])).toBeFalsy();
    });
});

describe(`Test static method \`${NamePathUtil.name}.${NamePathUtil.merge.name}\``, () => {
    it('should merge two name paths', () => {
        expect(NamePathUtil.merge('value')).toStrictEqual('value');
        expect(NamePathUtil.merge(['value'])).toStrictEqual(['value']);

        expect(NamePathUtil.merge('value1', 'value2')).toStrictEqual(['value2', 'value1']);
        expect(NamePathUtil.merge(['value1'], ['value2'])).toStrictEqual(['value2', 'value1']);
        expect(NamePathUtil.merge([], 'value')).toStrictEqual(['value']);
        expect(NamePathUtil.merge([], ['value'])).toStrictEqual(['value']);
    });
});
