import { BuiltInProcessEnv } from './getBuiltInProcessEnv';

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

export function getClientEnv(publicUrl: string) {
    const initial: NodeJS.ProcessEnv = {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: BuiltInProcessEnv.NODE_ENV,
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port` in webpackHotDevClient.
        // They are used as the `sockHost`, `sockPath` and `sockPort` options in webpack-dev-server.
        WDS_SOCKET_HOST: BuiltInProcessEnv.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: BuiltInProcessEnv.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: BuiltInProcessEnv.WDS_SOCKET_PORT,
    };

    const raw = {
        ...initial,
        ...Object.fromEntries(Object.entries(process.env).filter(([key]) => REACT_APP.test(key))),
    };

    // Stringify all values so we can feed into webpack DefinePlugin
    const stringified = {
        'process.env': Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, JSON.stringify(value)])),
    };

    return { raw, stringified };
}
