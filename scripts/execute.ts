import chalk from 'chalk';
import child from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const bin = path.resolve(__dirname, '../node_modules/.bin');

interface SwitchPlatformCallbacks<T> {
    darwin: () => T;
    linux: () => T;
    win32: () => T;
}

function switchPlatform<T>(callbacks: SwitchPlatformCallbacks<T>): T {
    const platform = os.platform();

    switch (platform) {
        case 'darwin':
            return callbacks.darwin();
        case 'linux':
            return callbacks.linux();
        case 'win32':
            return callbacks.win32();

        default:
            console.error(`Unsupported system: ${platform}`);
            process.exit();
    }
}

const getBrowserPath = (): string =>
    switchPlatform({
        // TODO
        darwin: () => 'chrome',
        // TODO
        linux: () => 'chrome',
        win32: () => 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge',
    });

const getNodePath = (): string =>
    switchPlatform({
        // TODO
        darwin: () => 'node',
        // TODO
        linux: () => 'node',
        win32: () => {
            const node = path.resolve(bin, 'node.exe');
            return fs.existsSync(node) ? node : 'node';
        },
    });

const getExecutorPath = (executor: Executor): string =>
    switchPlatform({
        darwin: () => path.resolve(bin, executor),
        linux: () => path.resolve(bin, executor),
        win32: () => path.resolve(bin, `${executor}.cmd`),
    });

export enum Executor {
    Browser = 'browser',
    Node = 'node',
    ReactAppRewired = 'react-app-rewired',
    Rimraf = 'rimraf',
    Tsc = 'tsc',
    Webpack = 'webpack',
}

const executors: { [e in Executor]: string } = {
    [Executor.Browser]: getBrowserPath(),
    [Executor.Node]: getNodePath(),
    [Executor.ReactAppRewired]: getExecutorPath(Executor.ReactAppRewired),
    [Executor.Rimraf]: getExecutorPath(Executor.Rimraf),
    [Executor.Tsc]: getExecutorPath(Executor.Tsc),
    [Executor.Webpack]: getExecutorPath(Executor.Webpack),
};

export function execute(executor: Executor, executorArgs: string[], env?: NodeJS.Dict<string>): Promise<void> {
    const _executor = executors[executor];
    const executorArgsStr = executorArgs.map((arg) => (arg.includes(' ') ? `'${arg}'` : arg)).join(' ');
    console.info(chalk.blackBright(`$ execute command: ${_executor} ${executorArgsStr}`));

    return new Promise((resolve) => {
        child
            .spawn(_executor, executorArgs, { env: env as NodeJS.ProcessEnv, stdio: 'inherit' })
            .on('exit', () => resolve());
    });
}
