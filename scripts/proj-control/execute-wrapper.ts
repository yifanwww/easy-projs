import { execute, Executor } from '../execute';
import { ProcessEnvKeys, ProcessEnvManager } from '../process-env';

export const executeReactAppRewired = (production: boolean, path: string, output: string, port?: string) =>
    execute(
        Executor.ReactAppRewired,
        [production ? 'build' : 'start', '--config-overrides', 'configs/webpack.react.config.js'],
        new ProcessEnvManager()
            .setEnv(ProcessEnvKeys.OutputDir, output)
            .setEnv(ProcessEnvKeys.Port, port)
            .setEnv(ProcessEnvKeys.ProjectDir, path).env,
    );

export const executeTsc = (watch: boolean, path: string, output: string) =>
    execute(Executor.Tsc, ['--build', path, '--outDir', output, watch && '--watch'].filter(Boolean) as string[]);

export const executeWebpack = (production: boolean, path: string, output: string, port?: string) =>
    execute(
        Executor.Webpack,
        [
            !production && 'server',
            '--config',
            'configs/webpack.custom.config.js',
            '--mode',
            production ? 'production' : 'development',
        ].filter(Boolean) as string[],
        new ProcessEnvManager()
            .setEnv(ProcessEnvKeys.OutputDir, output)
            .setEnv(ProcessEnvKeys.Port, port)
            .setEnv(ProcessEnvKeys.ProjectDir, path).env,
    );
