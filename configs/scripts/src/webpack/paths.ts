import { BuiltInProcessEnv } from './utils/getBuiltInProcessEnv';
import { getPublicUrl } from './utils/getPublicUrl';
import { resolveProj, resolveRepo } from './utils/resolveRelativePath';

const publicUrl = getPublicUrl(BuiltInProcessEnv.NODE_ENV === 'development', BuiltInProcessEnv.PUBLIC_URL);

export const webpackPaths = {
    appBuild: resolveProj('build'),
    appHtml: resolveProj('public/index.html'),
    appIndexTs: resolveProj('src/index.tsx'),
    appNodeModules: resolveProj('node_modules'),
    appPath: resolveProj('.'),
    appPublic: resolveProj('public'),
    appSrc: resolveProj('src'),
    appTsBuildInfoFile: resolveProj('node_modules/.cache/tsconfig.tsbuildinfo'),
    appTsConfig: resolveProj('tsconfig.json'),
    appTypeDeclarations: resolveProj('src/global.d.ts'),
    appWebpackCache: resolveProj('node_modules/.cache'),

    repoNodeModules: resolveRepo('node_modules'),

    proxySetup: resolveProj('src/setup.proxy.js'),
    testsSetup: resolveProj('src/setup.tests.ts'),

    publicUrl,
};
