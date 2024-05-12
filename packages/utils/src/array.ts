export class ArrayUtil {
    static filterFalsy<T>(arr: readonly (T | undefined | null | false)[]): T[] {
        return arr.filter((item): item is T => !!item);
    }

    /**
     * The TypeScript official signature of Array.prototype.includes doesn't allow `undefined` or `null`,
     * this method does.
     */
    static includes<T>(arr: readonly T[], searchElement: T | undefined | null, fromIndex?: number): boolean {
        return (arr as (T | undefined | null)[]).includes(searchElement, fromIndex);
    }

    /**
     * Checks if an array equals to another array.
     */
    static equal<T>(a: readonly T[], b: readonly T[]): boolean {
        if (a.length !== b.length) return false;

        const len = a.length;
        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    }

    static startsWith<T>(origin: readonly T[], test: readonly T[]): boolean {
        if (test.length > origin.length) return false;

        const minLen = Math.min(origin.length, test.length);

        for (let i = 0; i < minLen; i++) {
            if (origin[i] !== test[i]) {
                return false;
            }
        }

        return true;
    }

    static avoidEmpty<T>(arr: T[]): T[] | undefined {
        return arr.length === 0 ? undefined : arr;
    }

    static toArray<T>(value?: T | T[]): T[] {
        if (value === undefined) return [];
        return Array.isArray(value) ? value : [value];
    }
}
