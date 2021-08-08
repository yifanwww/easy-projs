import { execute, Executor } from '../execute';
import { ProcessEnvKeys, ProcessEnv } from '../process-env';

export const executeReactAppRewired = (production: boolean, path: string, output: string, port: string) =>
    execute(
        Executor.ReactAppRewired,
        [production ? 'build' : 'start', '--config-overrides', 'scripts/webpack-configs/webpack.react.config.js'],
        new ProcessEnv()
            .setEnv(ProcessEnvKeys.OutputDir, output)
            .setEnv(ProcessEnvKeys.Port, port)
            .setEnv(ProcessEnvKeys.ProjectDir, path).env,
    );

export const executeTsc = (watch: boolean, path: string) =>
    execute(Executor.Tsc, ['--build', path, watch && '--watch'].filter(Boolean) as string[]);

export const executeWebpack = (production: boolean, path: string, output: string, port: string) =>
    execute(
        Executor.Webpack,
        [
            !production && 'server',
            '--config',
            'scripts/webpack-configs/webpack.config.js',
            '--mode',
            production ? 'production' : 'development',
        ].filter(Boolean) as string[],
        new ProcessEnv()
            .setEnv(ProcessEnvKeys.OutputDir, output)
            .setEnv(ProcessEnvKeys.Port, port)
            .setEnv(ProcessEnvKeys.ProjectDir, path).env,
    );

export const executeRimraf = (path: string) => execute(Executor.Rimraf, [path]);

export const executeBrowser = (path: string) => execute(Executor.Browser, [path]);

export const executeNode = (path: string) => execute(Executor.Node, [path]);
