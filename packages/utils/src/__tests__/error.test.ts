import { tryCatch } from '../error';

describe(`Test fn ${tryCatch.name}`, () => {
    it('should return result if no error', async () => {
        const [result, error] = await tryCatch(Promise.resolve('hello world'));

        expect(result).toBe('hello world');
        expect(error).toBeNull();
    });

    it('should return error if error occurs', async () => {
        const [result, error] = await tryCatch(Promise.reject(new Error('error here')));

        expect(result).toBeNull();
        expect(error!.message).toBe('error here');
    });
});
