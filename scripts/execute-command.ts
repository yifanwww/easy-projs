import chalk from 'chalk';
import child from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const bin = path.resolve(__dirname, '../node_modules/.bin');

function getNodeExecutorPath(): string {
    const platform = os.platform();

    switch (os.platform()) {
        case 'darwin':
            // TODO
            return 'node';
        case 'linux':
            // TODO
            return 'node';
        case 'win32': {
            const node = path.resolve(bin, 'node.exe');
            return fs.existsSync(node) ? node : 'node';
        }

        default:
            console.error(`Unsupported system: ${platform}`);
            process.exit();
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum Executor {
    Node = 'node',
    ReactAppRewired = 'react-app-rewired',
    Rimraf = 'rimraf',
    Tsc = 'tsc',
    Webpack = 'webpack',
}
/* eslint-enable @typescript-eslint/naming-convention */

function getExecutorPath(executor: Executor): string {
    const platform = os.platform();

    switch (os.platform()) {
        case 'darwin':
            return path.resolve(bin, executor);
        case 'linux':
            return path.resolve(bin, executor);
        case 'win32':
            return path.resolve(bin, `${executor}.cmd`);

        default:
            console.error(`Unsupported system: ${platform}`);
            process.exit();
    }
}

const executors: { [e in Executor]: string } = {
    [Executor.Node]: getNodeExecutorPath(),
    [Executor.ReactAppRewired]: getExecutorPath(Executor.ReactAppRewired),
    [Executor.Rimraf]: getExecutorPath(Executor.Rimraf),
    [Executor.Tsc]: getExecutorPath(Executor.Tsc),
    [Executor.Webpack]: getExecutorPath(Executor.Webpack),
};

export function executeCommand(executor: Executor, executorArgs: string[], env?: NodeJS.Dict<string>): Promise<void> {
    const _executor = executors[executor];
    const executorArgsStr = executorArgs.map((arg) => (arg.includes(' ') ? `'${arg}'` : arg)).join(' ');
    console.info(chalk.blackBright(`$ execute command: ${_executor} ${executorArgsStr}`));

    return new Promise((resolve) => {
        child
            .spawn(_executor, executorArgs, { env: env as NodeJS.ProcessEnv, stdio: 'inherit' })
            .on('exit', () => resolve());
    });
}
