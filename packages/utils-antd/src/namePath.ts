import type { NamePath } from 'antd/lib/form/interface';

export class NamePathUtil {
    static equal(left: NamePath, right: NamePath) {
        return typeof left === typeof right && String(left) === String(right);
    }

    static includes(list: ReadonlyArray<NamePath> | undefined | null, searchElement: NamePath, fromIndex?: number) {
        return this.indexOf(list, searchElement, fromIndex) !== -1;
    }

    static indexOf(list: ReadonlyArray<NamePath> | undefined | null, searchElement: NamePath, fromIndex?: number) {
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

        const _value = Array.isArray(value) ? value : [value];
        const _prev = Array.isArray(prev) ? prev : [prev];
        return [..._prev, ..._value];
    }
}
