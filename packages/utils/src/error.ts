export async function tryCatch<R, E extends Error = Error>(promise: Promise<R>): Promise<[R, null] | [null, E]> {
    try {
        const result = await promise;
        return [result, null];
    } catch (error) {
        return [null, error as E];
    }
}
