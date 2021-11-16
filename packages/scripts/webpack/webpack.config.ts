// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js
// - createJestConfig.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/scripts/utils/createJestConfig.js

import path from 'path';
import { Configuration } from 'webpack';

import { paths } from '../utils';

const projectName = process.env.npm_package_name;
const projectRealName = projectName?.includes('@easy') ? projectName.slice(6) : projectName;

const project = projectRealName ? path.resolve(paths.packages, projectRealName) : process.cwd();
const resolveProject = (relative: string) => path.resolve(project, relative);

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
const craPaths = {
    appBuild: resolveProject('build'),
    appHtml: resolveProject('public/index.html'),
    appIndexTs: resolveProject('src/index.tsx'),
    appNodeModules: paths.nodeModules,
    appPath: project,
    appPublic: resolveProject('public'),
    appSrc: resolveProject('src'),
    appTsConfig: resolveProject('tsconfig.json'),
    appTypeDeclarations: resolveProject('src/global.d.ts'),
    proxySetup: resolveProject('src/setupProxy.js'),
    swSrc: resolveProject('src/serviceWorker.js'),
    testsSetup: resolveProject('src/test.setup.ts'),
};

interface CRAPaths {
    dotent: string;
    appPath: string;
    appBuild: string;
    appPublic: string;
    appHtml: string;
    appIndexJs: string;
    appPackageJson: string;
    appSrc: string;
    appTsConfig: string;
    appJsConfig: string;
    yarnLockFile: string;
    testsSetup: string;
    proxySetup: string;
    appNodeModules: string;
    swSrc: string;
    publicUrlOrPath: string;
    ownPath: string;
    pwnNodeModules: string;
    appTypeDeclarations: string;
    ownTypeDeclarations: string;
}

/**
 * Override paths configurations.
 *
 * The paths config to use when compiling your react app for development or production.
 */
function overridePathsConfigs(_paths: CRAPaths): CRAPaths {
    _paths.appBuild = craPaths.appBuild;
    _paths.appHtml = craPaths.appHtml;
    _paths.appIndexJs = craPaths.appIndexTs;
    _paths.appPath = craPaths.appPath;
    _paths.appPublic = craPaths.appPublic;
    _paths.appSrc = craPaths.appSrc;
    _paths.appTsConfig = craPaths.appTsConfig;
    _paths.appTypeDeclarations = craPaths.appTypeDeclarations;
    _paths.proxySetup = craPaths.proxySetup;
    _paths.swSrc = craPaths.swSrc;
    _paths.testsSetup = craPaths.testsSetup;

    return _paths;
}

/**
 * Override webpack configurations.
 *
 * The Webpack config to use when compiling your react app for development or production.
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    return webpack;
}

export = {
    webpack: overrideWebpackConfigs,
    paths: overridePathsConfigs,
};
