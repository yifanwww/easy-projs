import chalk from 'chalk';
import { Command, program } from 'commander';
import child from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// use import.meta.dirname after node 20.11 / 21.2
const _dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(_dirname, '..');
const jestBin = path.join(pkgRoot, 'node_modules/.bin/jest');

enum TestType {
    NODE_CJS,
    NODE_ESM,
    NODE_CJS_LEGACY_DECORATOR,
    NODE_ESM_LEGACY_DECORATOR,
    WEBAPP_CJS,
    WEBAPP_ESM,
}

function getJestConfig(type: TestType) {
    switch (type) {
        case TestType.NODE_CJS:
            return path.join(pkgRoot, 'dist/jest.config.node-cjs.js');
        case TestType.NODE_ESM:
            return path.join(pkgRoot, 'dist/jest.config.node-esm.js');
        case TestType.NODE_CJS_LEGACY_DECORATOR:
            return path.join(pkgRoot, 'dist/jest.config.node-cjs-legacy-decorator.js');
        case TestType.NODE_ESM_LEGACY_DECORATOR:
            return path.join(pkgRoot, 'dist/jest.config.node-esm-legacy-decorator.js');
        case TestType.WEBAPP_CJS:
            return path.join(pkgRoot, 'dist/jest.config.webapp-cjs.js');
        case TestType.WEBAPP_ESM:
            return path.join(pkgRoot, 'dist/jest.config.webapp-esm.js');

        default: {
            const never: never = type;
            return never;
        }
    }
}

function getExtraEnv(type: TestType): Record<string, string> {
    switch (type) {
        case TestType.NODE_CJS:
        case TestType.NODE_CJS_LEGACY_DECORATOR:
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

export function main() {
    const nodeCjsCommand = new Command('node-cjs')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_CJS, command.args));
    const nodeEsmCommand = new Command('node-esm')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_ESM, command.args));
    const nodeCjsLegacyDecoratorCommand = new Command('node-cjs-legacy-decorator')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_CJS_LEGACY_DECORATOR, command.args));
    const nodeEsmLegacyDecoratorCommand = new Command('node-esm-legacy-decorator')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.NODE_ESM_LEGACY_DECORATOR, command.args));
    const webappCjsCommand = new Command('webapp-cjs')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_CJS, command.args));
    const webappEsmCommand = new Command('webapp-esm')
        .allowExcessArguments()
        .allowUnknownOption()
        .action((_, command: Command) => exec(TestType.WEBAPP_ESM, command.args));

    program
        .name('unit-test')
        .addCommand(nodeCjsCommand)
        .addCommand(nodeEsmCommand)
        .addCommand(nodeCjsLegacyDecoratorCommand)
        .addCommand(nodeEsmLegacyDecoratorCommand)
        .addCommand(webappCjsCommand)
        .addCommand(webappEsmCommand)
        .parse();
}
