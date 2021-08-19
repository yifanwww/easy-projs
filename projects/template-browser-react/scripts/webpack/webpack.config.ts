// Used for `react-scripts` 4.0.3
// For more information about how to override default configs of `react-scripts`
// visit: https://github.com/timarney/react-app-rewired

// - paths.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js
// - webpack.config.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/webpack.config.js
// - createJestConfig.js:
//   https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/scripts/utils/createJestConfig.js

import { Config } from '@jest/types';
import chalk from 'chalk';
import _path from 'path';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { Configuration } from 'webpack';

const project = _path.join(__dirname, '../..');
const resolveProject = (relative: string) => _path.resolve(project, relative);
const resolveJest = (relative: string) => `<rootDir>/${relative}$1`;

// Edited from `https://github.com/facebook/create-react-app/blob/v4.0.3/packages/react-scripts/config/paths.js`
// Line 62-79
// eslint-disable-next-line @typescript-eslint/naming-convention
export const cra_paths = {
    appBuild: resolveProject('build'),
    appHtml: resolveProject('public/index.html'),
    appIndexTs: resolveProject('src/index.tsx'),
    appPublic: resolveProject('public'),
    appSrc: resolveProject('src'),
    appTsConfig: resolveProject('tsconfig.json'),
    appTypeDeclarations: resolveProject('src/react-app.d.ts'),
    testsSetup: resolveProject('src/test.setup.ts'),
};

// webpack path aliases
export const aliases = {
    '#Assets': resolveProject('src/Assets'),
    '#Utils': resolveProject('src/Utils'),
};

// jest path aliases
export const jestAliases = {
    '#Assets(.*)$': resolveJest('src/Assets'),
    '#Utils(.*)$': resolveJest('src/Utils'),
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
function overridePathsConfigs(paths: CRAPaths): CRAPaths {
    paths.appBuild = cra_paths.appBuild;
    paths.appHtml = cra_paths.appHtml;
    paths.appIndexJs = cra_paths.appIndexTs;
    paths.appPublic = cra_paths.appPublic;
    paths.appSrc = cra_paths.appSrc;
    paths.appTsConfig = cra_paths.appTsConfig;
    paths.appTypeDeclarations = cra_paths.appTypeDeclarations;
    paths.testsSetup = cra_paths.testsSetup;

    return paths;
}

/**
 * Override webpack configurations.
 *
 * The Webpack config to use when compiling your react app for development or production.
 */
function overrideWebpackConfigs(webpack: Configuration): Configuration {
    const isEnvProduction = webpack.mode === 'production';

    // Add custom path aliases.

    webpack.resolve!.alias = {
        ...webpack.resolve!.alias,
        ...aliases,
    };

    // Finish.

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
}

/**
 * Override jest configurations.
 *
 * The Jest config to use when running your jest tests - note that the normal rewires do not work here.
 */
function overrideJestConfigs(config: Config.InitialOptions): Config.InitialOptions {
    // 1. The option `setupFilesAfterEnv` is `<rootDir>/src/setupTests.${setupTestsFileExtension}`, change it.

    config.setupFilesAfterEnv = [cra_paths.testsSetup];

    // 2. Add custom path aliases.

    config.moduleNameMapper = {
        ...config.moduleNameMapper,
        ...jestAliases,
    };

    // Finish.

    // HACK: Cannot do test by jest v27 now, error `TypeError: babelJest.createTransformer is not a function` occurs.
    // Track PR: https://github.com/facebook/create-react-app/pull/10748
    // Once this PR is done, the test can go on.

    console.warn(
        chalk.yellow(
            'Cannot do test by jest v27 now, error `TypeError: babelJest.createTransformer is not a function` occurs.',
        ),
    );
    console.warn(chalk.yellow('Track PR: https://github.com/facebook/create-react-app/pull/10748'));
    console.warn(chalk.yellow('Once this PR is done, the test can go on.'));
    process.exit();

    return config;
}

module.exports = {
    webpack: overrideWebpackConfigs,
    paths: overridePathsConfigs,
    jest: overrideJestConfigs,
};
