import type { InternalNamePath } from 'antd/es/form/interface';

/**
 * The `NamePath` type provided from `antd` now does a complicated calculation
 * to get the final name path possibilities from the type of form object.
 * We have to use a customized `NamePath` to use the legacy type definition.
 * ref: https://ant.design/components/form#namepath
 */
type NamePath = string | number | (string | number)[];

export class NamePathUtil {
    private static _toArray(value: NamePath): InternalNamePath {
        return Array.isArray(value) ? value : [value];
    }

    static equal(left: NamePath, right: NamePath) {
        return typeof left === typeof right && String(left) === String(right);
    }

    static includes(list: readonly NamePath[] | undefined | null, searchElement: NamePath, fromIndex?: number) {
        return this.indexOf(list, searchElement, fromIndex) !== -1;
    }

    static indexOf(list: readonly NamePath[] | undefined | null, searchElement: NamePath, fromIndex?: number) {
        if (!list) return -1;

        for (let i = fromIndex ?? 0; i < list.length; i++) {
            if (this.equal(list[i], searchElement)) {
                return i;
            }
        }

        return -1;
    }

    static merge(value: NamePath, prev?: NamePath): NamePath {
        if (prev === undefined) return value;

        const valueArr = NamePathUtil._toArray(value);
        const prevArr = NamePathUtil._toArray(prev);
        return [...prevArr, ...valueArr];
    }

    static startsWith(value: NamePath, prefix: NamePath) {
        const valueArr = NamePathUtil._toArray(value);
        const prefixArr = NamePathUtil._toArray(prefix);

        if (valueArr.length < prefixArr.length) return false;

        for (let i = 0; i < prefixArr.length; i++) {
            if (valueArr[i] !== prefixArr[i]) return false;
        }

        return true;
    }
}
