// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js

const _path = require('path');

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 17-18
const projectDir = process.env.EasyProjsTargetProjectPath;
const resolveProject = (relativePath) => _path.resolve(projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
const _paths = {
    appBuild: resolveProject('build'),
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

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack, env) {
    const isEnvProduction = webpack.mode === 'production';

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' }).wrap(webpack) : webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
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
