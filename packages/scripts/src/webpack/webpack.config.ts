// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// please visit https://github.com/timarney/react-app-rewired

import path from 'path';
import { Configuration } from 'webpack';

import { paths } from '../utils';

const projectName = process.env.npm_package_name;
const projectRealName = projectName?.includes('@easy') ? projectName.slice(6) : projectName;

const project = projectRealName ? path.resolve(paths.packages, projectRealName) : process.cwd();
const resolveProject = (relative: string) => path.resolve(project, relative);

// Check https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
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
    proxySetup: resolveProject('src/setup.proxy.js'),
    swSrc: resolveProject('src/serviceWorker.js'),
    testsSetup: resolveProject('src/setup.tests.ts'),
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
 *
 * Check Check https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
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
 *
 * Check https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    return webpack;
}

export = {
    paths: overridePathsConfigs,
    webpack: overrideWebpackConfigs,
};
