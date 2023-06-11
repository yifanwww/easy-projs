// This webpack plugin lets us interpolate custom variables into `index.html`.
// Usage: `new InterpolateHtmlPlugin(HtmlWebpackPlugin, { 'MY_VARIABLE': 42 })`
// Then, you can use %MY_VARIABLE% in your `index.html`.

// It works in tandem with HtmlWebpackPlugin.
// Learn more about creating plugins like this:
// https://github.com/ampedandwired/html-webpack-plugin#events

import escapeStringRegexp from 'escape-string-regexp';
import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Compilation, Compiler, WebpackPluginInstance } from 'webpack';

interface IHtmlWebpackPlugin {
    getHooks(compilation: Compilation): HtmlWebpackPlugin.Hooks;
}

export class InterpolateHtmlPlugin implements WebpackPluginInstance {
    private _htmlWebpackPlugin: IHtmlWebpackPlugin;
    private _replacements: NodeJS.ProcessEnv;

    constructor(htmlWebpackPlugin: IHtmlWebpackPlugin, replacements: NodeJS.ProcessEnv) {
        this._htmlWebpackPlugin = htmlWebpackPlugin;
        this._replacements = replacements;
    }

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('InterpolateHtmlPlugin', (compilation) => {
            this._htmlWebpackPlugin
                .getHooks(compilation)
                .afterTemplateExecution.tap('InterpolateHtmlPlugin', (data) => {
                    // Run HTML through a series of user-specified string replacements.
                    Object.entries(this._replacements).forEach(([key, value]) => {
                        // eslint-disable-next-line no-param-reassign
                        data.html = data.html.replace(new RegExp(`%${escapeStringRegexp(key)}%`, 'g'), value!);
                    });

                    return data;
                });
        });
    }
}
