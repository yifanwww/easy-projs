export function abstractFn() {
    throw new Error('Not Implemented');
}

export function abstractAsyncFn() {
    return Promise.reject(new Error('Not Implemented'));
}
