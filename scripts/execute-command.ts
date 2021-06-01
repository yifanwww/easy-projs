import chalk from 'chalk';
import child from 'child_process';

export function executeCommand(executor: string, executorArgs: string): Promise<void> {
    return new Promise((resolve) => {
        console.info(chalk.blackBright(`$ execute command: ${executor} ${executorArgs}`));

        child.spawn(executor, executorArgs.split(' '), { stdio: 'inherit' }).on('exit', () => resolve());
    });
}
