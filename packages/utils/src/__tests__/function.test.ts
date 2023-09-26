import { abstractAsyncFn, abstractFn, makeFn, noAsync } from '../function.js';

describe(`Test fn ${abstractFn.name}`, () => {
    it('should throw an error', () => {
        expect(() => abstractFn()).toThrow('Not Implemented');
    });
});

describe(`Test fn ${abstractAsyncFn.name}`, () => {
    it('should throw an error', async () => {
        await expect((): Promise<never> => abstractAsyncFn()).rejects.toThrow('Not Implemented');
    });
});

describe(`Test fn ${noAsync.name}`, () => {
    it('should drop the returned Promise', async () => {
        function fn() {
            return Promise.resolve();
        }

        await expect(fn()).resolves.toBeUndefined();
        expect(noAsync(fn)()).toBeUndefined();
    });
});

describe(`Test fn \`${makeFn.name}\``, () => {
    it('should return the fn that it receives', () => {
        const fn = () => {};
        expect(makeFn(fn)).toBe(fn);
    });
});
