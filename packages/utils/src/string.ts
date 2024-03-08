export class StringUtil {
    static isNilOrEmpty(value: unknown): value is undefined | null | '' {
        return value === undefined || value === null || value === '';
    }

    static startsWithOneOf(str: string, searchStrings: readonly string[], position?: number) {
        return searchStrings.some((item) => str.startsWith(item, position));
    }
}
