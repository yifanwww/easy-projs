function getBuiltInProcessEnv() {
    return {
        NODE_ENV: process.env.NODE_ENV || 'development',
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        PUBLIC_URL: process.env.PUBLIC_URL,
        BUILD_PATH: process.env.BUILD_PATH,
        CI: process.env.CI,
        IMAGE_INLINE_SIZE_LIMIT: process.env.IMAGE_INLINE_SIZE_LIMIT,
    };
}

export const BuiltInProcessEnv = getBuiltInProcessEnv();
