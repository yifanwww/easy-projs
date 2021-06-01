import chalk from 'chalk';
import child from 'child_process';

export function executeCommand(executor: string, executorArgs: string[]): Promise<void> {
    const executorArgsStr = executorArgs.map((arg) => (arg.includes(' ') ? `'${arg}'` : arg)).join(' ');
    console.info(chalk.blackBright(`$ execute command: ${executor} ${executorArgsStr}`));

    return new Promise((resolve) => {
        child.spawn(executor, executorArgs, { stdio: 'inherit' }).on('exit', () => resolve());
    });
}
