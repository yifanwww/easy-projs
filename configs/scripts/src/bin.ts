import chalk from 'chalk';
import child from 'child_process';
import concurrently from 'concurrently';

import { paths } from './utils/paths';

const genCommand = (...params: (string | false | undefined | null)[]) => params.filter(Boolean).join(' ');
const genBuildCommand = (name: string) => `pnpm run --filter ${name} build`;

type Order = Array<string | string[]>;

const maxProcesses = 4;

async function buildOrder(order: Order): Promise<void> {
    for (const names of order) {
        if (typeof names === 'string') {
            const command = genBuildCommand(names);
            child.execSync(command, { stdio: 'inherit' });
        } else {
            try {
                // eslint-disable-next-line no-await-in-loop
                await concurrently(
                    names.map((name) => ({ command: genBuildCommand(name), name })),
                    { maxProcesses },
                ).result;
            } catch (err) {
                console.error(err);
            }
        }
    }
}

export async function buildPackages(): Promise<void> {
    const order: Order = [
        /* ----- may be used by all other packages ----- */
        ['@easy-pkg/utils', '@easy-pkg/utils-type', '@easy-pkg/utils-test'],

        /* ----- product packages ----- */
        [
            '@easy-pkg/assets',
            '@easy-pkg/hooks',
            '@easy-pkg/memorize',
            '@easy-proj/misc',
            '@easy-pkg/random-string',
            '@easy-pkg/react-hooks-nodom',
            '@easy-pkg/template-nodejs',
            '@easy-pkg/utils-fluentui',
            '@easy-pkg/utils-react',
            '@easy-pkg/utils-redux',
        ],
    ];

    return buildOrder(order);
}

export async function buildProjects(): Promise<void> {
    const order = [
        '@easy-proj/perf-js',
        '@easy-proj/perf-react',
        '@easy-proj/proving-ground-nodejs',
        '@easy-proj/react-rerender-test',
        '@easy-proj/template-browser-react',
        '@easy-proj/template-nodejs',
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
