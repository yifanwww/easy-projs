import chalk from 'chalk';
import { Command, program } from 'commander';
import child from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

enum TestType {
    NODE_CJS,
    NODE_ESM,
    WEBAPP_CJS,
    WEBAPP_ESM,
}

function getJestConfig(type: TestType) {
    switch (type) {
        case TestType.NODE_CJS:
            return require.resolve('./jest.config.node-cjs.js');
        case TestType.NODE_ESM:
            return require.resolve('./jest.config.node-esm.js');
        case TestType.WEBAPP_CJS:
            return require.resolve('./jest.config.webapp-cjs.js');
        case TestType.WEBAPP_ESM:
            return require.resolve('./jest.config.webapp-esm.js');

        default: {
            const never: never = type;
            return never;
        }
    }
}

function exec(type: TestType, extraArgs: string[]): void {
    const jestConfig = getJestConfig(type);

    const command = ['jest', '--config', jestConfig, ...extraArgs].join(' ');

    const env = {
        ...process.env,
        BABEL_ENV: 'test',
        NODE_ENV: 'test',
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

export function main() {
    const nodeCjsCommand = new Command('node-cjs')
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_CJS, command.args));
    const nodeEsmCommand = new Command('node-esm')
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_ESM, command.args));
    const webappCjsCommand = new Command('webapp-cjs')
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_CJS, command.args));
    const webappEsmCommand = new Command('webapp-esm')
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_ESM, command.args));

    program
        .name('unit-test')
        .addCommand(nodeCjsCommand)
        .addCommand(nodeEsmCommand)
        .addCommand(webappCjsCommand)
        .addCommand(webappEsmCommand)
        .parse();
}
