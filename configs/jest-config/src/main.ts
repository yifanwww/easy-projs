import chalk from 'chalk';
import { Command } from 'commander';
import child from 'node:child_process';
import path from 'node:path';
import url from 'node:url';

const pkgRoot = path.join(import.meta.dirname, '..');
const jestBin = path.join(pkgRoot, 'node_modules/.bin/jest');

const resolve = (p: string) => url.fileURLToPath(import.meta.resolve(p));

enum TestType {
    NODE_ESM,
    NODE_ESM_LEGACY_DECORATOR,
    WEBAPP_CJS,
    WEBAPP_ESM,
}

export function main() {
    const program = new Command();

    program.name('unit-test').description('Run unit tests with jest').configureHelp({ sortSubcommands: true });

    program
        .command('node-esm')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_ESM, command.args));

    program
        .command('node-esm-legacy-decorator')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_ESM_LEGACY_DECORATOR, command.args));

    program
        .command('webapp-cjs')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_CJS, command.args));

    program
        .command('webapp-esm')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_ESM, command.args));

    program.parse();
}

function exec(type: TestType, extraArgs: string[]): void {
    const jestConfig = getJestConfig(type);
    const extraEnv = getExtraEnv(type);

    const command = [jestBin, '--config', jestConfig, ...extraArgs].join(' ');

    const env = {
        ...process.env,
        ...extraEnv,
        NODE_ENV: 'test',
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

function getJestConfig(type: TestType) {
    switch (type) {
        case TestType.NODE_ESM:
            return resolve('./jest.config.node-esm.js');
        case TestType.NODE_ESM_LEGACY_DECORATOR:
            return resolve('./jest.config.node-esm-legacy-decorator.js');
        case TestType.WEBAPP_CJS:
            return resolve('./jest.config.webapp-cjs.js');
        case TestType.WEBAPP_ESM:
            return resolve('./jest.config.webapp-esm.js');

        default: {
            const never: never = type;
            return never;
        }
    }
}

function getExtraEnv(type: TestType): Record<string, string> {
    switch (type) {
        case TestType.WEBAPP_CJS:
            return {};
        case TestType.NODE_ESM:
        case TestType.NODE_ESM_LEGACY_DECORATOR:
        case TestType.WEBAPP_ESM:
            return {
                NODE_OPTIONS: [process.env.NODE_OPTIONS, '--experimental-vm-modules'].filter(Boolean).join(' '),
            };

        default: {
            const never: never = type;
            return never;
        }
    }
}
