export function toError(err: unknown): Error {
    return err instanceof Error
        ? err
        : new Error(typeof err === 'object' && err !== null ? JSON.stringify(err) : String(err));
}
