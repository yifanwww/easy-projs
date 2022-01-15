import chalk from 'chalk';
import child from 'child_process';
import concurrently from 'concurrently';

import { paths } from './paths';

const genCommand = <T extends (string | false | undefined | null)[]>(...params: T) => params.filter(Boolean).join(' ');
const genBuildCommand = (name: string) => `npm run build --workspace ${name}`;

type Order = Array<string | string[]>;

const maxProcesses = 4;

async function buildOrder(order: Order): Promise<void> {
    for (const names of order) {
        if (typeof names === 'string') {
            const command = genBuildCommand(names);
            child.execSync(command, { stdio: 'inherit' });
        } else {
            // eslint-disable-next-line no-await-in-loop
            await concurrently(
                names.map((name) => ({ command: genBuildCommand(name), name })),
                { maxProcesses },
            ).result;
        }
    }
}

export async function buildPackages(): Promise<void> {
    const order: Order = [
        /* ----- may be used by all other packages ----- */
        ['@easy/utils-type', '@easy/utils-test'],

        /* ----- product packages ----- */
        [
            '@easy/assets',
            '@easy/benchmark-js',
            '@easy/hooks',
            '@easy/memorize',
            '@easy/misc',
            '@easy/package-template-nodejs',
            '@easy/random-string',
            '@easy/utils-fluentui',
            '@easy/utils-react',
            '@easy/utils-redux',
        ],
    ];

    return buildOrder(order);
}

export async function buildProjects(): Promise<void> {
    const order = [
        '@easy/demo-test-nodejs',
        '@easy/perf-js',
        '@easy/perf-react',
        '@easy/project-template-browser-react',
        '@easy/project-template-nodejs',
        '@easy/projs-manage',
        '@easy/react-rerender-test',
    ];

    return buildOrder([order]);
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
    const isVerbose = process.argv.includes('--verbose');

    const command = genCommand(
        'jest',
        '--config',
        paths.jestConfig,
        watch ? '--watch' : '--coverage',
        isVerbose && '--verbose',
    );

    const env = {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BABEL_ENV: 'test',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}