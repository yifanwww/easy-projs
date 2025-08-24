/* eslint-disable @typescript-eslint/ban-ts-comment */

export function createProcessEnvResetter() {
    const initialProcessEnv = { ...process.env };
    return function resetProcessEnv() {
        process.env = { ...initialProcessEnv };
    };
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
