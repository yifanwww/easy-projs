import chalk from 'chalk';
import child from 'node:child_process';

import { paths } from './utils/paths';

const genCommand = (...params: (string | false | undefined | null)[]) => params.filter(Boolean).join(' ');

type CompilationFlagRenderer = 'build' | 'build-profile' | 'dev';

export function buildReact(): void {
    function printHelpInfo(): void {
        console.error(chalk.red('react-proj [mode]'));
        console.error(chalk.red('[mode] can be "build", "build-profile" or "dev"'));
    }

    const flag = process.argv[2] as CompilationFlagRenderer;

    if (flag === undefined) {
        printHelpInfo();
        process.exit(1);
    } else if (flag !== 'build' && flag !== 'build-profile' && flag !== 'dev') {
        console.error(chalk.red(`Unknown argument "mode": ${flag as string}\n`));
        printHelpInfo();
        process.exit(1);
    }

    const command = genCommand(
        'webpack',
        flag === 'dev' ? 'serve' : 'build',
        flag === 'dev' ? '--mode development' : '--mode production',
        `--config ${paths.reactWebpackConfig}`,
        flag === 'build-profile' && '--env profiling',
    );

    const env = {
        ...process.env,
        BABEL_ENV: flag === 'dev' ? 'development' : 'production',
        NODE_ENV: flag === 'dev' ? 'development' : 'production',
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

export function unitTest(watch: boolean): void {
    const argv = process.argv.slice(2);

    const command = genCommand('jest', '--config', paths.jestConfig, watch ? '--watch' : '--coverage', ...argv);

    const env = {
        ...process.env,
        BABEL_ENV: 'test',
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}
