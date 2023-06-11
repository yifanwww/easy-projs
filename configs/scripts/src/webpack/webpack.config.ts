// Ensure environment variables are read.
import './dotenv';
// Import this to get type declarations of webpack-dev-server.
import 'webpack-dev-server';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'node:fs';
import path from 'node:path';
import resolve from 'resolve';
import TerserPlugin from 'terser-webpack-plugin';
import { DefinePlugin, IgnorePlugin } from 'webpack';
import type { Configuration, LoaderContext, RuleSetUseItem, WebpackPluginInstance } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import { webpackPaths } from './paths';
import { InterpolateHtmlPlugin } from './plugins/InterpolateHtmlPlugin';
import { createEnvHash } from './utils/createEnvHash';
import { BuiltInProcessEnv } from './utils/getBuiltInProcessEnv';
import { getCacheIdentifier } from './utils/getCacheIdentifier';
import { getClientEnv } from './utils/getClientEnv';
import { getCSSModuleLocalIdent } from './utils/getCSSModuleLocalIdent';

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// style files regexes
const cssRegex = {
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
};

interface CSSLoaderOptions {
    importLoaders: number;
    modules: {
        mode: 'local' | 'icss';
        getLocalIdent?: (
            context: LoaderContext<any>,
            localIdentName: string,
            localName: string,
            options: any,
        ) => string;
    };
}

interface CliConfigOptions {
    config?: string;
    mode?: Configuration['mode'];
    env?: string;
}

type ConfigurationFactory = (
    env: Record<string, boolean | number | string>,
    args: CliConfigOptions,
) => Configuration | Promise<Configuration>;

const factory: ConfigurationFactory = (env, argv) => {
    const mode = argv.mode === 'production' ? 'production' : 'development';

    const isEnvDevelopment = mode === 'development';
    const isEnvProduction = mode === 'production';

    // Variable used for enabling profiling in Production passed into alias object.
    // Uses a flag if passed into the build command.
    const isEnvProductionProfile = isEnvProduction && !!env.profiling;

    // We provide `paths.publicUrl` to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    // Get environment variables to inject into our app.
    const clientEnv = getClientEnv(webpackPaths.publicUrl.slice(0, -1));

    const shouldUseReactRefresh = true;

    const imageInlineSizeLimit = Number.parseInt(BuiltInProcessEnv.IMAGE_INLINE_SIZE_LIMIT || '10000', 10) || 10_000;

    // common function to get style loaders
    const getStyleLoaders = (cssOptions: CSSLoaderOptions, useSass: boolean): RuleSetUseItem[] => {
        const loaders: (RuleSetUseItem | false)[] = [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate index.html folder,
                // in production `paths.publicUrl` can be a relative path
                options: webpackPaths.publicUrl.startsWith('.') ? { publicPath: '../../' } : {},
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    ...cssOptions,
                    sourceMap: true,
                },
            },
            {
                // Options for PostCSS as we reference these options twice.
                // Adds vendor prefixing based on your specified browser support in `package.json`.
                loader: require.resolve('postcss-loader'),
                options: {
                    postcssOptions: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebook/create-react-app/issues/2677
                        ident: 'postcss',
                        config: false,
                        plugins: [
                            'postcss-flexbugs-fixes',
                            [
                                'postcss-preset-env',
                                {
                                    autoprefixer: { flexbox: 'no-2009' },
                                    stage: 3,
                                },
                            ],
                            // Adds PostCSS Normalize as the reset css with default options,
                            // so that it honors browserslist config in package.json
                            // which in turn let's users customize the target behavior as per their needs.
                            'postcss-normalize',
                        ],
                    },
                    sourceMap: true,
                },
            },
            useSass && {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: true,
                    root: webpackPaths.appSrc,
                },
            },
            useSass && {
                loader: require.resolve('sass-loader'),
                options: {
                    sourceMap: true,
                },
            },
        ];
        return loaders.filter((item): item is RuleSetUseItem => !!item);
    };

    const webpackConfig: Configuration = {
        target: ['browserslist'],
        // Webpack noise constrained to errors and warnings
        stats: {
            all: undefined,
            assets: true,
            assetsSort: '!size',
            assetsSpace: Infinity,
            chunks: false,
            entrypoints: true,
            excludeAssets: (name) => !/\.js$|\.css$/i.test(name),
            moduleAssets: false,
            groupAssetsByChunk: false,
            groupAssetsByEmitStatus: false,
            groupAssetsByInfo: false,
            groupModulesByAttributes: false,
            errors: true,
            warnings: true,
        },
        mode,
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry: webpackPaths.appIndexTs,

        output: {
            // The build folder.
            path: webpackPaths.appBuild,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            // There will be one main bundle, and one file per asynchronous chunk.
            // In development, it does not produce real files.
            filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
            // There are also additional JS chunk files if you use code splitting.
            chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
            // webpack uses `publicPath` to determine where the app is being served from.
            // It requires a trailing slash, or the file assets will get an incorrect path.
            publicPath: webpackPaths.publicUrl,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: isEnvProduction
                ? (info: any) => path.relative(webpackPaths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
                : (info: any) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
            clean: true,
        },

        cache: {
            type: 'filesystem',
            version: createEnvHash(clientEnv.raw),
            cacheDirectory: webpackPaths.appWebpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: [require.resolve('webpack/lib')],
                config: [__filename],
                tsconfig: [webpackPaths.appTsConfig],
            },
        },

        infrastructureLogging: {
            level: 'warn',
        },
        ignoreWarnings: [BuiltInProcessEnv.CI && /Failed to parse source map/].filter((item): item is RegExp => !!item),

        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // We want terser to parse ecma 8 code.
                            // However, we don't want it to apply any minification steps that turns valid ecma 5 code
                            // into invalid ecma 5 code.
                            // This is why the 'compress' and 'output' sections only apply transformations that are
                            // ecma 5 safe.
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 2017,
                        },
                        compress: {
                            ecma: 5,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        keep_classnames: isEnvProductionProfile,
                        keep_fnames: isEnvProductionProfile,
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                }),
                // This is only used in production mode
                new CssMinimizerPlugin(),
            ],
        },

        resolve: {
            // This allows you to set a fallback for where webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win" if there are any conflicts.
            // This matches Node resolution mechanism.
            // https://github.com/facebook/create-react-app/issues/253
            modules: ['node_modules', webpackPaths.appNodeModules, webpackPaths.repoNodeModules],
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support some tools,
            // although we do not recommend using it, see:
            // https://github.com/facebook/create-react-app/issues/290
            // `web` extension prefixes have been added for better support for React Native Web.
            extensions: [
                '.js',
                '.json',
                '.jsx',
                '.mjs',
                '.ts',
                '.tsx',
                '.web.js',
                '.web.jsx',
                '.web.mjs',
                '.web.ts',
                '.web.tsx',
            ],
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                'react-native': 'react-native-web',
                // Allows for better profiling with ReactDevTools
                ...(isEnvProductionProfile && {
                    'react-dom$': 'react-dom/profiling',
                    'scheduler/tracing': 'scheduler/tracing-profiling',
                }),
                src: webpackPaths.appSrc,
            },
        },

        module: {
            parser: {
                javascript: {
                    exportsPresence: 'error',
                },
            },
            rules: [
                // Handle node_modules packages that contain sourcemaps
                {
                    enforce: 'pre',
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                    loader: require.resolve('source-map-loader'),
                } as const,
                {
                    // "oneOf" will traverse all following loaders until one will match the requirements.
                    // When no loader matches it will fall back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // TODO: Merge this config once `image/avif` is in the mime-db
                        // https://github.com/jshttp/mime-db
                        {
                            test: [/\.avif$/],
                            type: 'asset',
                            mimetype: 'image/avif',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
                            },
                        },
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            type: 'asset',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
                            },
                        },
                        {
                            test: /\.svg$/,
                            use: [
                                {
                                    loader: require.resolve('@svgr/webpack'),
                                    options: {
                                        prettier: false,
                                        svgo: false,
                                        svgoConfig: {
                                            plugins: [{ removeViewBox: false }],
                                        },
                                        titleProp: true,
                                        ref: true,
                                    },
                                },
                                {
                                    loader: require.resolve('file-loader'),
                                    options: {
                                        name: 'static/media/[name].[hash].[ext]',
                                    },
                                },
                            ],
                            issuer: {
                                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                            },
                        },
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: webpackPaths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                                presets: [
                                    [require.resolve('babel-preset-react-app'), { runtime: 'automatic' }],
                                    [
                                        '@babel/preset-typescript',
                                        {
                                            // Can omit this setting once babel is upgraded above v8
                                            // https://github.com/babel/babel/issues/10746
                                            allowDeclareFields: true,
                                        },
                                    ],
                                ],
                                babelrc: false,
                                configFile: false,
                                // Make sure we have a unique cache identifier, erring on the
                                // side of caution.
                                // We remove this when the user ejects because the default
                                // is sane and uses Babel options. Instead of options, we use
                                // the react-scripts and babel-preset-react-app versions.
                                cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : 'development', [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                ]),
                                plugins: [isEnvDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },
                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                // Make sure we have a unique cache identifier, erring on the
                                // side of caution.
                                // We remove this when the user ejects because the default
                                // is sane and uses Babel options. Instead of options, we use
                                // the react-scripts and babel-preset-react-app versions.
                                cacheIdentifier: getCacheIdentifier(isEnvProduction ? 'production' : 'development', [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                ]),
                                // Babel sourcemaps are needed for debugging into node_modules
                                // code.  Without the options below, debuggers like VSCode
                                // show incorrect code and set breakpoints on the wrong lines.
                                sourceMaps: true,
                                inputSourceMap: true,
                            },
                        },
                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        // By default we support CSS Modules with the extension .module.css
                        {
                            test: cssRegex.css,
                            exclude: cssRegex.cssModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                                false,
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                        // using the extension .module.css
                        {
                            test: cssRegex.cssModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    modules: {
                                        mode: 'local',
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                false,
                            ),
                        },
                        // Opt-in support for SASS (using .scss or .sass extensions).
                        // By default we support SASS Modules with the
                        // extensions .module.scss or .module.sass
                        {
                            test: cssRegex.sass,
                            exclude: cssRegex.sassModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 3,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                                true,
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules, but using SASS
                        // using the extension .module.scss or .module.sass
                        {
                            test: cssRegex.sassModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 3,
                                    modules: {
                                        mode: 'local',
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                true,
                            ),
                        },
                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise be processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            type: 'asset/resource',
                        },
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ],
                },
            ].filter(Boolean),
        },

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: webpackPaths.appPublic,
                        globOptions: {
                            ignore: ['**/index.html'],
                        },
                    },
                ],
            }),
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin({
                inject: true,
                template: webpackPaths.appHtml,
                ...(isEnvProduction
                    ? {
                          minify: {
                              removeComments: true,
                              collapseWhitespace: true,
                              removeRedundantAttributes: true,
                              useShortDoctype: true,
                              removeEmptyAttributes: true,
                              removeStyleLinkTypeAttributes: true,
                              keepClosingSlash: true,
                              minifyJS: true,
                              minifyCSS: true,
                              minifyURLs: true,
                          },
                      }
                    : undefined),
            }),
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // It will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, clientEnv.raw),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Otherwise React will be compiled in the very slow development mode.
            new DefinePlugin(clientEnv.stringified),
            // Experimental hot reloading for React .
            // https://github.com/facebook/react/tree/main/packages/react-refresh
            isEnvDevelopment && shouldUseReactRefresh && new ReactRefreshWebpackPlugin({ overlay: false }),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                }),
            // Generate an asset manifest file with the following content:
            // - "files" key: Mapping of all asset filenames to their corresponding
            //   output file so that tools can pick it up without having to parse
            //   `index.html`
            // - "entrypoints" key: Array of files which are included in `index.html`,
            //   can be used to reconstruct the HTML if necessary
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: webpackPaths.publicUrl,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = {
                        ...seed,
                        ...Object.fromEntries(files.map((file) => [file.name, file.path])),
                    };
                    const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            new IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            // TypeScript type checking
            new ForkTsCheckerWebpackPlugin({
                async: isEnvDevelopment,
                typescript: {
                    typescriptPath: resolve.sync('typescript', { basedir: webpackPaths.appNodeModules }),
                    configOverwrite: {
                        compilerOptions: {
                            sourceMap: true,
                            skipLibCheck: true,
                            inlineSourceMap: false,
                            declarationMap: false,
                            noEmit: true,
                            incremental: true,
                            tsBuildInfoFile: webpackPaths.appTsBuildInfoFile,
                        },
                    },
                    context: webpackPaths.appPath,
                    diagnosticOptions: {
                        syntactic: true,
                    },
                    mode: 'write-references',
                    // profile: true,
                },
                issue: {
                    // This one is specifically to match during CI tests,
                    // as micromatch doesn't match '../cra-template-typescript/template/src/App.tsx' otherwise.
                    include: [{ file: '../**/src/**/*.{ts,tsx}' }, { file: '**/src/**/*.{ts,tsx}' }],
                    exclude: [
                        { file: '**/src/**/__tests__/**' },
                        { file: '**/src/**/?(*.){spec|test}.*' },
                        { file: '**/src/setupProxy.*' },
                        { file: '**/src/setupTests.*' },
                    ],
                },
                logger: {
                    infrastructure: 'silent',
                },
            }),
        ].filter(Boolean) as WebpackPluginInstance[],

        node: {
            __dirname: false,
            __filename: false,
        },

        performance: {
            maxAssetSize: WARN_AFTER_CHUNK_GZIP_SIZE,
            maxEntrypointSize: WARN_AFTER_BUNDLE_GZIP_SIZE,
        },

        devServer: {
            host: '0.0.0.0',
            port: 3000,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
            },
            static: {
                // By default WebpackDevServer serves physical files from current directory
                // in addition to all the virtual build products that it serves from memory.
                // This is confusing because those files won’t automatically be available in
                // production build folder unless we copy them.
                // However, copying the whole project directory is dangerous because we may expose sensitive files.
                // Instead, we establish a convention that only files in `public` directory get served.
                // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
                // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
                // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
                // Note that we only recommend to use `public` folder as an escape hatch for files like `favicon.ico`,
                // `manifest.json`, and libraries that are for some reason broken when imported through webpack.
                // If you just want to use an image, put it in `src` and `import` it from JavaScript instead.
                directory: webpackPaths.appPublic,
                publicPath: [webpackPaths.publicUrl],
            },
            client: {
                webSocketURL: {
                    // Enable custom sockjs pathname for websocket connection to hot reloading server.
                    // Enable custom sockjs hostname, pathname and port for websocket connection to hot reloading server
                    hostname: BuiltInProcessEnv.WDS_SOCKET_HOST,
                    pathname: BuiltInProcessEnv.WDS_SOCKET_PATH,
                    port: BuiltInProcessEnv.WDS_SOCKET_PORT,
                },
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            devMiddleware: {
                // It is important to tell WebpackDevServer to use the same "publicPath" path as
                // we specified in the webpack config.
                // When homepage is '.', default to serving from the root.
                // remove last slash so user can land on `/test` instead of `/test/`.
                publicPath: webpackPaths.publicUrl.slice(0, -1),
            },
            historyApiFallback: {
                // Paths with dots should still use the history fallback.
                // See https://github.com/facebook/create-react-app/issues/387.
                disableDotRule: true,
                index: webpackPaths.publicUrl,
            },
            onBeforeSetupMiddleware: (devServer) => {
                if (fs.existsSync(webpackPaths.proxySetup)) {
                    // This registers user provided middleware for proxy reasons
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    require(webpackPaths.proxySetup)(devServer.app);
                }
            },
        },
    };

    return webpackConfig;
};

export = factory;
