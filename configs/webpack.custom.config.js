const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const postcssSafeParser = require('postcss-safe-parser');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

function getStaticPaths() {
    const repoDir = path.resolve(__dirname, '..');
    const resolvePepo = (relativePath) => path.resolve(repoDir, relativePath);

    return {
        appNodeModules: resolvePepo('node_modules'),
        appPackageJson: resolvePepo('package.json'),
    };
}

const staticPaths = getStaticPaths();
const appPackageJson = require(staticPaths.appPackageJson);

/**
 * @param {boolean} isEnvDevelopment
 */
function getPaths(isEnvDevelopment, projectDir) {
    const resolveProject = (relativePath) => path.resolve(projectDir, relativePath);

    return {
        appBuild: resolveProject('build'),
        appHtml: resolveProject('src/index.html'),
        appIndexTs: resolveProject('src/index.ts'),
        appSrc: resolveProject('src'),
        appTsConfig: resolveProject('tsconfig.json'),
        devServerContentBase: resolveProject('build/static/js/bundle.js'),
        publicPath: isEnvDevelopment ? '/' : './',
    };
}

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    // TODO: Pass projectDir
    const paths = getPaths(isEnvDevelopment);

    console.log(env);
    console.log(argv);

    // Variable used for enabling profiling in Production.
    // Uses a flag if passed into the build command.
    const isEnvProductionProfile = isEnvProduction && env && 'profile' in env;

    /**
     * common function to get style loaders
     * @param {object} cssOptions
     * @param {string} preProcessor
     */
    function getStyleLoaders(cssOptions, preProcessor) {
        return [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate index.html folder.
                // `paths.publicPath` can be a relative path.
                options: paths.publicPath.startsWith('.') ? { publicPath: '../../' } : {},
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            {
                // Options for PostCSS as we reference these options twice.
                // Adds vendor prefixing based on your specified browser support in package.json.
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: { flexbox: 'no-2009' },
                            stage: 3,
                        }),
                        // Adds PostCSS Normalize as the reset css with default options, so that it honors browserslist
                        // config in package.json which in turn let's users customize the target behavior as per their
                        // needs.
                        postcssNormalize(),
                    ],
                    sourceMap: isEnvProduction || isEnvDevelopment,
                },
            },

            preProcessor !== undefined && {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isEnvProduction || isEnvDevelopment,
                    root: paths.appSrc,
                },
            },
            preProcessor !== undefined && {
                loader: require.resolve(preProcessor),
                options: { sourceMap: true },
            },
        ].filter(Boolean);
    }

    const mode = isEnvProduction ? 'production' : isEnvDevelopment && 'development';

    // Stop compilation early in production
    const bail = isEnvProduction;

    const devtool = isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map';

    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    const entry = paths.appIndexTs;

    // Some libraries import Node modules but don't use them in the browser.
    // Tell webpack to provide empty mocks for them so importing them works.
    const node = {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    };

    const output = {
        // The build folder.
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: isEnvDevelopment,
        // There will be one main bundle, and one file per asynchronous chunk.
        // In development, it does not produce real files.
        filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : isEnvDevelopment && 'static/js/bundle.js',
        // TODO: remove this when upgrading to webpack 5
        futureEmitAssets: true,
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: isEnvProduction
            ? 'static/js/[name].[contenthash:8].chunk.js'
            : isEnvDevelopment && 'static/js/[name].chunk.js',
        // webpack uses `publicPath` to determine where the app is being served from.
        // It requires a trailing slash, or the file assets will get an incorrect path.
        publicPath: paths.publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows).
        devtoolModuleFilenameTemplate: isEnvProduction
            ? (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
            : isEnvDevelopment && ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
        //  Prevents conflicts when multiple webpack runtimes (from different apps) are used on the same page.
        jsonpFunction: `webpackJsonp${appPackageJson.name}`,
        // this defaults to 'window', but by setting it to 'this' then module chunks which are built will work in web
        // workers as well.
        globalObject: 'this',
    };

    const optimization = {
        // This is only used in production mode
        minimize: isEnvProduction,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it to apply any minification
                        // steps that turns valid ecma 5 code into invalid ecma 5 code. This is why the 'compress' and
                        // 'output' sections only apply transformations that are ecma 5 safe.
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
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
                        // Turned on because emoji and regex is not minified properly using default.
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: postcssSafeParser,
                    map: {
                        // `inline: false` forces the sourcemap to be output into a separate file.
                        inline: false,
                        // `annotation: true` appends the sourceMappingURL to the end of the css file, helping the
                        // browser find the sourcemap.
                        annotation: true,
                    },
                },
                cssProcessorPluginOptions: {
                    preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                },
            }),
        ],

        // Automatically split vendor and commons.
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
            chunks: 'all',
            name: isEnvDevelopment,
        },

        // Keep the runtime chunk separated to enable long term caching.
        // https://twitter.com/wSokra/status/969679223278505985
        // https://github.com/facebook/create-react-app/issues/5358
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    };

    const resolve = {
        // XXX: Add .json?
        extensions: ['.js', '.mjs', '.ts'],
        plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })],
    };

    const module = {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            {
                // "oneOf" will traverse all following loaders until one will match the requirements. When no loader
                // matches it will fall back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets smaller than specified limit
                    // in bytes as data URLs to avoid requests.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10_000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },

                    // Compile typescript code.
                    {
                        test: /\.ts$/i,
                        loader: require.resolve('ts-loader'),
                        include: [paths.appSrc],
                        options: { configFile: paths.appTsConfig },
                    },

                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use MiniCSSExtractPlugin to extract that CSS to a file, but in development
                    // "style" loader enables hot editing of CSS.
                    // By default we support CSS Modules with the extension .module.css
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction || isEnvDevelopment,
                        }),
                        // Don't consider CSS imports dead code even if the containing package claims to have no side
                        // effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true,
                    },

                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules).
                    // using the extension .module.css
                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction || isEnvDevelopment,
                            modules: { getLocalIdent: getCSSModuleLocalIdent },
                        }),
                    },

                    // Opt-in support for SASS (using .scss or .sass extensions).
                    // By default we support SASS Modules with the extensions .module.scss or .module.sass
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 3,
                                sourceMap: isEnvProduction || isEnvDevelopment,
                            },
                            'sass-loader',
                        ),
                        // Don't consider CSS imports dead code even if the containing package claims to have no side
                        // effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true,
                    },

                    // Adds support for CSS Modules by SASS, using the extension .module.scss or .module.sass
                    {
                        test: sassModuleRegex,
                        use: getStyleLoaders(
                            {
                                importLoaders: 3,
                                sourceMap: isEnvProduction || isEnvDevelopment,
                                modules: { getLocalIdent: getCSSModuleLocalIdent },
                            },
                            'sass-loader',
                        ),
                    },

                    // `file loader` makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn't use `test` so it will catch all modules that fall through the other loaders.
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|ts)$/, /\.html$/, /\.json$/],
                        options: { name: 'static/media/[name].[hash:8].[ext]' },
                    },

                    // ** STOP ** Are you adding a new loader?
                    // Make sure to add the new loader(s) before the `file loader`.
                ],
            },
        ],
    };

    const plugins = [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin(
            Object.assign(
                { inject: true, template: paths.appHtml },
                isEnvProduction && {
                    minify: {
                        collapseWhitespace: true,
                        keepClosingSlash: true,
                        minifyCSS: true,
                        minifyJS: true,
                        minifyURLs: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        useShortDoctype: true,
                    },
                },
            ),
        ),

        // HACK: This is necessary to emit hot updates (CSS and Fast Refresh):
        // isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),

        // Watcher doesn't work well if you mistype casing in a path so we use a plugin that prints an error when you
        // attempt to do this.
        // See https://github.com/facebook/create-react-app/issues/240
        isEnvDevelopment && new CaseSensitivePathsPlugin(),

        // If you require a missing module and then `npm install` it, you still have to restart the development server
        // for webpack to discover it. This plugin makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebook/create-react-app/issues/186
        isEnvDevelopment && new WatchMissingNodeModulesPlugin(staticPaths.appNodeModules),

        isEnvProduction &&
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output both options are optional.
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),

        // Generate an asset manifest file with the following content:
        // - `files`: Mapping of all asset filenames to their corresponding output file so that tools can pick it
        //   up without having to parse `index.html`.
        // - `entrypoints`: Array of files which are included in `index.html`, can be used to reconstruct the HTML
        //   if necessary.
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: paths.publicPath,
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

                return { files: manifestFiles, entrypoints: entrypointFiles };
            },
        }),
    ].filter(Boolean);

    const devServer = {
        contentBase: paths.devServerContentBase,
        port: 3888,
    };

    const webpack = {
        bail,
        devServer,
        devtool,
        entry,
        mode,
        module,
        node,
        optimization,
        output,
        plugins,
        resolve,
        stats: 'errors-warnings',
    };

    process.exit();

    return isEnvProduction ? new SpeedMeasurePlugin({ outputFormat: 'human' }).wrap(webpack) : webpack;
};
