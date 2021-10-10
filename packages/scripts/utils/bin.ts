import chalk from 'chalk';
import child from 'child_process';

import { paths } from './paths';

export function buildPackages(): void {
    const packagesOrder = [
        '@easy/hooks',
        '@easy/memorize',
        '@easy/package-template-nodejs',
        '@easy/random-string',
        '@easy/utils-fluentui',
        '@easy/utils-redux',
    ];

    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
    }
}

export function buildProjects(): void {
    const packagesOrder = [
        '@easy/demo-test-nodejs',
        '@easy/project-template-browser-react',
        '@easy/project-template-nodejs',
    ];

    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
    }
}

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
        console.error(chalk.red(`Unknown argument "mode": ${flag}\n`));
        printHelpInfo();
        process.exit(1);
    }

    const command = [
        'react-app-rewired',
        flag === 'dev' ? 'start' : 'build',
        '--config-overrides',
        paths.reactWebpackConfig,
        flag === 'build-profile' && '--profile',
    ]
        .filter(Boolean)
        .join(' ');

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}

export function unitTest(watch: boolean): void {
    const command = ['jest', '--config', paths.jestConfig, watch ? '--watch' : '--coverage'].join(' ');

    const env = {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BABEL_ENV: 'test',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}