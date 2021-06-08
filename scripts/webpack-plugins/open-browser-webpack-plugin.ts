import chalk from 'chalk';
import { Compiler } from 'webpack';

import { execute, Executor } from '../execute';

export class OpenBrowserWebpackPlugin {
    private _url?: string;
    private _open: boolean;

    constructor(url: string, open: boolean = true) {
        this._open = open;
        this._url = url;
    }

    public apply = (compiler: Compiler) => {
        if (this._open) {
            compiler.hooks.done.tap('OpenBrowserWebpackPlugin', () => {
                this._openBrowser();
            });
        }
    };

    private _info = (msg: string) => console.info(chalk.blackBright('[open-browser-webpack-plugin] ') + msg);

    private _once(callback: () => void) {
        let called = false;

        return () => {
            if (!called) {
                called = true;
                callback();
            }
        };
    }

    private _openBrowser = this._once(() => {
        this._info('Open browser.');
        execute(Executor.Browser, [this._url!]);
    });
}
