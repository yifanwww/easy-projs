export class Uint8ArrayUtil {
    static merge(arrays: Uint8Array[]): Uint8Array {
        const length = arrays.reduce((prev, curr) => prev + curr.length, 0);
        const mergedArray = new Uint8Array(length);
        let offset = 0;
        for (const array of arrays) {
            mergedArray.set(array, offset);
            offset += array.length;
        }
        return mergedArray;
    }
}
