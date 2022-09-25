import chalk from 'chalk';
import child from 'child_process';

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
        'react-app-rewired',
        flag === 'dev' ? 'start' : 'build',
        '--config-overrides',
        paths.reactWebpackConfig,
        flag === 'build-profile' && '--profile',
    );

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}

export function unitTest(watch: boolean): void {
    const argv = process.argv.slice(2);

    const command = genCommand('jest', '--config', paths.jestConfig, watch ? '--watch' : '--coverage', ...argv);
    // console.log(command);

    const env = {
        ...process.env,
        BABEL_ENV: 'test',
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}
