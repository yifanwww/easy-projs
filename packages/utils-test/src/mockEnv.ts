/* eslint-disable @typescript-eslint/ban-ts-comment */

export function createProcessNodeEnvMocker() {
    const INITIAL_PROCESS_ENV = process.env;

    function mockProcessNodeEnv(value: typeof process.env.NODE_ENV) {
        process.env = {
            ...INITIAL_PROCESS_ENV,
            NODE_ENV: value,
        };
    }

    function resetProcessNodeEnv() {
        process.env = { ...INITIAL_PROCESS_ENV };
    }

    return { mockProcessNodeEnv, resetProcessNodeEnv };
}

export function createWindowLocationMocker() {
    const INITIAL_WINDOW_LOCATION = window.location;

    function mockWindowLocation(url: string) {
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = new URL(url);
    }

    function resetWindowLocation() {
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = INITIAL_WINDOW_LOCATION;
    }

    return { mockWindowLocation, resetWindowLocation };
}
