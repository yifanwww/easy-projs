import { abstractAsyncFn, abstractFn } from '../function.js';

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
