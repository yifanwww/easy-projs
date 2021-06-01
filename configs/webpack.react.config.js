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
const _projectDir = _path.resolve(__dirname, '..');
const ResolveProject = (relativePath) => _path.resolve(_projectDir, relativePath);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
const _paths = {
    appBuild: ResolveProject('build'),
    appHtml: ResolveProject('public/index.html'),
    appIndexTs: ResolveProject('src/index.tsx'),
    appPublic: ResolveProject('public'),
    appSrc: ResolveProject('src'),
    appTsConfig: ResolveProject('tsconfig.json'),
    proxySetup: ResolveProject('src/setupProxy.js'),
    testsSetup: ResolveProject('src/setupTests.ts'),
};

// const fs = require('fs');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// Write configurations as json data into file, for debugging.
// function WriteConfigs(config, filename) {
//     const configStr = JSON.stringify(config, '', '  ');
//     fs.writeFileSync(filename, configStr);
// }

// Override webpack configurations.
// The Webpack config to use when compiling your react app for development or production.
function OverrideWebpackConfigs(webpack, env) {
    const isEnvProduction = webpack.mode === 'production';

    // 1. Set target to "electron-renderer"

    webpack.target = 'electron-renderer';

    // 2. Set the correct directories where the source code should be compiled.

    // WriteConfigs(webpack.module.rules, 'webpack.json');
    // webpack.module.rules[1].oneOf[2].include = [_paths.appSrc];

    // Finish.

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'humanVerbose' }).wrap(webpack) : webpack;
}

// Override paths configurations.
function OverridePathsConfigs(paths, env) {
    paths.appPublic = _paths.appPublic;
    paths.appHtml = _paths.appHtml;
    paths.appIndexJs = _paths.appIndexTs;
    paths.appSrc = _paths.appSrc;
    paths.appTsConfig = _paths.appTsConfig;
    paths.testsSetup = _paths.testsSetup;
    paths.proxySetup = _paths.proxySetup;

    // WriteConfigs(paths, 'paths.json');

    return paths;
}

module.exports = {
    webpack: OverrideWebpackConfigs,
    paths: OverridePathsConfigs,
};
