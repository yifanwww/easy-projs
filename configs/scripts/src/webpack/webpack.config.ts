// Used for `react-scripts` 5.0.1
// For more information about how to override default configs of `react-scripts`
// please visit https://github.com/timarney/react-app-rewired

/* eslint-disable no-param-reassign */

import path from 'node:path';
import type { Configuration } from 'webpack';

import { paths } from '../utils';

const PROJ_PREFIX = '@easy-proj/';

const projName = process.env.npm_package_name;
const projRealName = projName?.includes(PROJ_PREFIX) ? projName.slice(PROJ_PREFIX.length) : projName;

const proj = projRealName ? path.resolve(paths.projs, projRealName) : process.cwd();
const resolveProj = (relative: string) => path.resolve(proj, relative);

// Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
const craPaths = {
    appBuild: resolveProj('build'),
    appHtml: resolveProj('public/index.html'),
    appIndexTs: resolveProj('src/index.tsx'),
    // FIXME: not all dependencies are in root node_modules
    appNodeModules: paths.rootNodeModules,
    appPath: proj,
    appPublic: resolveProj('public'),
    appSrc: resolveProj('src'),
    appTsConfig: resolveProj('tsconfig.json'),
    appTypeDeclarations: resolveProj('src/global.d.ts'),
    proxySetup: resolveProj('src/setup.proxy.js'),
    swSrc: resolveProj('src/serviceWorker.js'),
    testsSetup: resolveProj('src/test.setup.ts'),
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
 * Check Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
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
 * Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/webpack.config.js
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    webpack.module.rules[1].oneOf[3].options.presets.push([
        '@babel/preset-typescript',
        {
            // Can omit this setting when babel is upgrade above v8
            // https://github.com/babel/babel/issues/10746
            allowDeclareFields: true,
        },
    ]);

    return webpack;
}

export = {
    paths: overridePathsConfigs,
    webpack: overrideWebpackConfigs,
};
