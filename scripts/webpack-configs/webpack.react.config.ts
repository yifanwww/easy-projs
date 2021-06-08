// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

import _path from 'path';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Configuration } from 'webpack';

import { getEnv, ProcessEnvKeys } from '../process-env';

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 17-18
const projectDir = getEnv(ProcessEnvKeys.ProjectDir)!;
const resolveProject = (relativePath: string) => _path.resolve(projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
const _paths = {
    appBuild: getEnv(ProcessEnvKeys.OutputDir),
    appHtml: resolveProject('public/index.html'),
    appIndexTs: resolveProject('src/index.tsx'),
    appPath: projectDir,
    appPublic: resolveProject('public'),
    appSrc: resolveProject('src'),
    appTsConfig: resolveProject('tsconfig.json'),
    appTypeDeclarations: resolveProject('src/react-app-env.d.ts'),
    proxySetup: resolveProject('src/setupProxy.js'),
    swSrc: resolveProject('src/service-worker.js'),
    testsSetup: resolveProject('src/setupTests.ts'),
};

// Override localhost port.
process.env.PORT = getEnv(ProcessEnvKeys.Port)!;

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack: Configuration) {
    const isEnvProduction = webpack.mode === 'production';

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths: any) {
    paths.appBuild = _paths.appBuild;
    paths.appHtml = _paths.appHtml;
    paths.appIndexJs = _paths.appIndexTs;
    paths.appPath = _paths.appPath;
    paths.appPublic = _paths.appPublic;
    paths.appSrc = _paths.appSrc;
    paths.appTsConfig = _paths.appTsConfig;
    paths.appTypeDeclarations = _paths.appTypeDeclarations;
    paths.proxySetup = _paths.proxySetup;
    paths.swSrc = _paths.swSrc;
    paths.testsSetup = _paths.testsSetup;

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs,
};
